const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: 'Username already used.', status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: 'Email already used.', status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      displayName: username,
    });

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username }).select([
        'username',
        'displayName',
        'email',
        'password',
        'isAvatarImageSet',
        'avatarImage',
      ])
    if (!user) {
      return res.json({ msg: 'Incorrect username.', status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: 'Incorrect password.', status: false });
    }

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } })

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.setDisplayName = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { displayName } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        displayName,
      },
      { new: true }
    );
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

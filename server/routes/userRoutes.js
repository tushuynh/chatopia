const { register, login, setAvatar, getAllUsers, setDisplayName } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login)
router.post('/setAvatar/:id', setAvatar)
router.post('/setDisplayName/:id', setDisplayName)
router.get('/allUsers/:id', getAllUsers)

module.exports = router;

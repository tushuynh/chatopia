const { addMessage, getAllMessages, findAll } = require('../controllers/messageController');

const router = require('express').Router();

router.post('/addMsg', addMessage);
router.post('/getMsg', getAllMessages);
router.get('/test', findAll)

module.exports = router;

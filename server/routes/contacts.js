const controller = require('../controllers/contact');
const auth = require('../middleware/auth');
const acl = require('express-acl');
const router = require('express').Router();


router.post('/', controller.postMessage)
router.get('/', auth, acl.authorize, controller.getMessages)
router.delete('/:contactId', auth, acl.authorize, controller.deleteMessage)

module.exports = router
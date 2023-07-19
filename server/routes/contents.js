const controller = require('../controllers/content');
const auth = require('../middleware/auth');
const acl = require('express-acl');
const router = require('express').Router();

router.get('/', controller.getAllContents)
router.get('/:contentId', controller.getContentId)
router.post('/', auth, acl.authorize, controller.postContent)
router.put('/:contentId', auth, acl.authorize, controller.updateContent)


module.exports = router
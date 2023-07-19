const controller = require('../controllers/user')
const router = require('express').Router();
const auth = require('../middleware/auth');
const acl = require('express-acl');



router.post('/', auth, acl.authorize, controller.addUser) // /user
router.get('/myprofil', auth, acl.authorize, controller.getMyProfile) // /user/myprofil
router.get('/:userId', auth, acl.authorize, controller.getUser) // /user/:userId
router.put('/:userId', auth, acl.authorize, controller.updateUser) // /user/:userId
router.delete('/:userId', auth, acl.authorize, controller.deleteUser) // /user/:userId
router.get('/', auth, acl.authorize, controller.getAllUsers) // /user/all


module.exports = router;
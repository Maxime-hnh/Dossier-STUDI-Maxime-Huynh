const controller = require('../controllers/openingHours');
const auth = require('../middleware/auth');
const acl = require('express-acl');
const router = require('express').Router();

router.get('/', controller.getOpeningHours)
router.post('/', auth, acl.authorize, controller.createOpeningHoursForWeek)
router.put('/', auth, acl.authorize, controller.updateOpeningHoursForWeek)


module.exports = router
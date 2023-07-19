const controller = require('../controllers/car');
const auth = require('../middleware/auth');
const acl = require('express-acl');
const router = require('express').Router();


router.get('/all', controller.getAllCars)
router.get('/:carId', controller.getCar)
router.post('/', auth, acl.authorize, controller.createCar)
router.put('/:carId', auth, acl.authorize, controller.updateCar)
router.delete('/:carId', auth, acl.authorize, controller.deleteCar)

module.exports = router
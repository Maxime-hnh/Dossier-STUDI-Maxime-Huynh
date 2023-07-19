const controller = require('../controllers/testimonial');
const auth = require('../middleware/auth');
const acl = require('express-acl');
const router = require('express').Router();


router.get('/approved', controller.getApprovedTestimonials)
router.post('/', controller.postTestimonial)
router.get('/all', auth, acl.authorize, controller.getAllTestimonials)
router.get('/toTreat',auth, acl.authorize, controller.getToTreatTestimonials)
router.put('/changeStatus/:testimonialId',auth, acl.authorize, controller.ChangeStatusTestimonials)
router.get('/unapproved', auth, acl.authorize, controller.getUnapprovedTestimonials)
router.get('/rates',auth, acl.authorize, controller.getRates)
router.delete('/:testimonialId',auth, acl.authorize, controller.deleteTestimonial)

module.exports = router
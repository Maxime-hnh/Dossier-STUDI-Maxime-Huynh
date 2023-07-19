const Testimonial = require('../models/testimonial')


// POST TESTIMONIAL
exports.postTestimonial = (req, res, next) => {
    const { body } = req
    Testimonial.create(body)
        .then(result => {
            res.status(201).json({
                message: 'Commentaire transmis.',
                testimonial: result
            })
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}

// ALL TESTIMONIALS
exports.getAllTestimonials = (req, res, next) => {
    Testimonial.findAll()
        .then(testimonials => {
            res.status(200).json(testimonials)
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}

// GET ALL RATES
exports.getRates = (req, res, next) => {
    Testimonial.findAll({ attributes: ['rate'] })
        .then(rates => {
            res.status(200).json(rates)
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}


// TO TREAT TESTIMONIALS
exports.getToTreatTestimonials = (req, res, next) => {
    Testimonial.findAll({
        where: {
            isChecked: false
        }
    })
        .then(unapprovedTestimonials => {
            res.status(200).json(unapprovedTestimonials)
        })
        .catch(err => {
            console.log('Une erreur est survenue : ', err);
        });
}

// GET UNNAPROVED TESTIMONIALS
exports.getUnapprovedTestimonials = (req, res, next) => {
    Testimonial.findAll({
        where: {
            isApproved: false,
            isChecked : true
        }
    })
        .then(unapprovedTestimonials => {
            res.status(200).json(unapprovedTestimonials)
        })
        .catch(err => {
            console.log('Une erreur est survenue : ', err);
        });
}

// GET APPROVED TESTIMONIALS
exports.getApprovedTestimonials = (req, res, next) => {
    Testimonial.findAll({
        where: {
            isApproved: true
        }
    })
        .then(approvedTestimonials => {
            res.status(200).json(approvedTestimonials)
        })
        .catch(err => {
            console.log('Une erreur est survenue : ', err);
        });
}


// CHANGE UNAPPROVED TO APPROVED
exports.ChangeStatusTestimonials = (req, res, next) => {
    const testimonialId = req.params.testimonialId
    const { isApproved, isChecked } = req.body
    Testimonial.findByPk(testimonialId)
        .then(testimonial => {
            if (!testimonial) {
                res.status(404).json({ message: 'Témoignage introuvable' })
            }
            testimonial.isApproved = isApproved; 
            testimonial.isChecked = isChecked;
            return testimonial.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Témoignage validé', testimonial: result })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


//DELETE
exports.deleteTestimonial = (req, res, next) => {
    const testimonialId = req.params.testimonialId
    Testimonial.findByPk(testimonialId)
        .then(testimonial => {
            if (!testimonial) {
                return res.status(404).json({ message: 'Avis introuvable' })
            }
            return testimonial.destroy({
                where: {
                    id: testimonialId
                }
            })
        })
        .then(result => {
            res.status(200).json({ message: 'Avis supprimée avec succès.' })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}



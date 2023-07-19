const Contact = require('../models/contact');


exports.postMessage = (req, res, next) => {
    const { body } = req;
    Contact.create(body)
        .then(result => {
            res.status(201).json({
                message: 'Message transmis avec succès.',
                contact: result
            });
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}

exports.getMessages = (req, res, next) => {
    Contact.findAll()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => console.log(err));
}


exports.deleteMessage = (req, res, next) => {
    const contactId = req.params.contactId
    Contact.findByPk(contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ message: 'Message introuvable' })
            }
            return contact.destroy({
                where: {
                    id: contactId
                }
            })
        })
        .then(result => {
            res.status(200).json({ message: 'Message supprimée avec succès.' })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}
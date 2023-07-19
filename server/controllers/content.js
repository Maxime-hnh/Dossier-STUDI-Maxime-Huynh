const Content = require('../models/content');


exports.postContent = (req, res, next) => {
    const { body } = req;
    Content.create(body)
        .then(result => {
            res.status(201).json({
                message: 'Contenu téléchargé avec succès.',
                content: result
            });
        })
        .catch(err => console.log('Une erreur est survenue :', err))
}


exports.updateContent = (req, res, next) => {
    const contentId = req.params.contentId
    const { body } = req;

    Content.findByPk(contentId)
        .then(content => {
            if (!content) {
                return res.status(404).json({ message: 'Contenu introuvable' })
            }
            const contentTarget = Object.assign(content, body)
            return contentTarget.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Annonce mise à jour.', content: result })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


exports.getAllContents = (req, res, next) => {
    Content.findAll()
        .then(contents => {
            res.status(200).json(contents);
        })
        .catch(err => console.log(err));
}

exports.getContentId = (req, res, next) => {
    const contentId = req.params.contentId
    Content.findByPk(contentId)
        .then(content => {
            if (!content) {
                return res.status(404).json({ message: 'Contenu introuvable.' })
            }
            res.status(200).json(content)
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}



const { User, validate } = require('../models/user');
const bcrypt = require("bcrypt");



// SIGN UP
exports.addUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (err) {
        res.send('Une erreur est survenue : ', err);
    }
};


// GET ALL USERS
exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: { exclude: ['password'] },
    })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => console.log(err));
}


// GET USER BY ID
exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable.' });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
};



// GET MY PROFIL
exports.getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] }
        });
        res.send(user);
    } catch (err) {
        res.send('Une erreur est survenue : ', err);
    }
};


// UPDATE USER
exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const { body } = req;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable' })
            }
            const userTarget = Object.assign(user, body)
            return userTarget.save()
        })
        .then(result => {
            res.status(200).json({ message: 'Utilisateur mis à jour', user: result })
        })
        .catch(err => console.log('Une erreur est survenue : ', err))
}


// DELETE USER 
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable.' });
            }
            return User.destroy({
                where: {
                    id: userId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'L\'utilisateur a bien été supprimé.' });
        })
        .catch(err => console.log(err));
}




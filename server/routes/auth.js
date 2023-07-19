const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");


// LOG IN
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(400).send("Utilisateur ou adresse mail introuvable");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("adresse email ou mot de passe invalide");

        const token = user.generateAuthToken();
        res.send({token});
    } catch (error) {
        console.log(error);
        res.send("Une erreur est survenue");
    }
});

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = router;
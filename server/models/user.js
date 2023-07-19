const { Sequelize } = require('sequelize');
const db = require('../util/database');
const jwt = require("jsonwebtoken");
const Joi = require("joi");


const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false
    }
})

//User.associate = (models) => {

   // User.hasMany(models.Car, {
   //     foreignKey: 'user_id',
   //     as : 'Cars',
   //     required : false
   // });
//}

User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, role: this.role }, process.env.JWTPRIVATEKEY);
    return token;
};


const validate = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string()
    });
    return schema.validate(user);
};

module.exports = { User, validate };
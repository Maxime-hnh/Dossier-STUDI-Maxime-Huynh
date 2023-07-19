const { Sequelize, DataTypes } = require('sequelize')
const db = require('../util/database')
const sequelize = require('../util/database')

const Testimonial = db.define('testimonial', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    opinion: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5
        },
        allowNull: false
    },
    isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isChecked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Testimonial
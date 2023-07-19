const Sequelize = require('sequelize');
const db = require('../util/database');


const OpeningHours = db.define('openingHours', {
    dayOfWeek: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']]
        }
    },
    openingTime: {
        type: Sequelize.TIME,
        allowNull: true
    },
    closingTime: {
        type: Sequelize.TIME,
        allowNull: true
    },
    closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false
});



module.exports = OpeningHours;
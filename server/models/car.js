const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./user')
const db = require('../util/database');


const Car = db.define('car', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    milage: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    features: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue : {
            engine : 0,
            fiscalHorsepower : 0,
            bodyCar : '',
            seatingCapacity : 5,
            power : ''
        }
    },
    options: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type : Sequelize.STRING,
        allowNull : true
    },
    file : {
        type : DataTypes.JSONB,
        allowNull : true
    },
    createdBy: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            id: 'id'
        }
    }
})

// ASSIGN EVENT TO HIS CREATOR
Car.belongsTo(User, { foreignKey: 'createdBy' });


module.exports = Car;
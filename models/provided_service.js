const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const ProvidedService = sequelize.define('provided_service', {
    name: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    time: {
        type: DataTypes.TIME
    },
    time_till_complete: {
        type: DataTypes.FLOAT
    }
});

module.exports = ProvidedService
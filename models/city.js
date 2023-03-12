const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING
    }
});

module.exports = City
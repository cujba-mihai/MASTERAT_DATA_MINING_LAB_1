const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const Continent = sequelize.define('continent', {
    name: {
        type: DataTypes.STRING
    }
});

module.exports =  Continent
const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');
const Manufacturer = require('./manufacturer')
const Country = sequelize.define('country', {
    name: {
        type: DataTypes.STRING
    }
});


module.exports = Country
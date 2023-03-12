const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const ServiceCenter = sequelize.define('service_center', {
    name: {
        type: DataTypes.STRING
    }
});

module.exports = ServiceCenter
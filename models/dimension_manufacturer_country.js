const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const DimensionManufacturerCountry = sequelize.define('dimension_manufacturer_country', {
    manufacturer: {
        type: DataTypes.STRING
    }, 
    country: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
});

module.exports = DimensionManufacturerCountry
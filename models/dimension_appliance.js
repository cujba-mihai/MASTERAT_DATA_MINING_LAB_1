const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const DimensionAppliance = sequelize.define('dimension_appliance', {
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
});

module.exports = DimensionAppliance
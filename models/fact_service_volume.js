const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const FactServiceVolume = sequelize.define('fact_service_volume', {
    volume: {
        type: DataTypes.FLOAT
    }
});

module.exports = FactServiceVolume
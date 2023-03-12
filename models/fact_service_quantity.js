const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const FactServiceQuantity = sequelize.define('fact_service_quantity', {
    quantity: {
        type: DataTypes.INTEGER
    }
});

module.exports = FactServiceQuantity
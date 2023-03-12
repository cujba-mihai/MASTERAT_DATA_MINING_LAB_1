const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const DimensionLocation = sequelize.define('dimension_location', {
  service_center: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING,
  },
  continent: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
});

module.exports = DimensionLocation;

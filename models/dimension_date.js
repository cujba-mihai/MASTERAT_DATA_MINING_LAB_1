const { sequelize } = require("../db");
const { DataTypes } = require('sequelize');

const DimensionDate = sequelize.define('dimension_date', {
  fullDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quarter: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day_of_week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  day_of_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = DimensionDate;

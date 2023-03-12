const { sequelize } = require("../db");
const { DataTypes, Model } = require('sequelize');

class Manufacturer extends Model {}

Manufacturer.init({
  name: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'manufacturer'
});


module.exports = Manufacturer;

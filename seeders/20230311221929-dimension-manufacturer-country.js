'use strict';

const { models } = require('../db');
const manufacturers = require('../companies')

module.exports = {
  async up(queryInterface, Sequelize) {
    await models.dimension_manufacturer_country.bulkCreate(manufacturers)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dimension_manufacturer_countries', null, {});
  },
};

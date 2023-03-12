'use strict';

const { models } = require('../db');
const locations = require('../locations')

module.exports = {
  async up(queryInterface, Sequelize) {
    await models.dimension_location.bulkCreate(locations)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dimension_locations', null, {});
  },
};

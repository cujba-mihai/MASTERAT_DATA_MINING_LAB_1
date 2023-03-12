'use strict';
const { models } = require('../db');
const appliances = require('../appliances')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const _appliances = appliances.map((appliance, index) => {
      return ({ name: appliance})
    })

    await models.dimension_appliance.bulkCreate(_appliances)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('dimension_appliances', null, {});

  }
};

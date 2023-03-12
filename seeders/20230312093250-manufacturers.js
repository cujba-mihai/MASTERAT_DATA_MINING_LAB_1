'use strict';
const { models } = require('../db');
const manufacturers = require('../companies')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Promise.all(manufacturers.map(async({manufacturer, country: countryOfOrigin}) => {
    const country = await models.country.findOne({
      where: {
        name: countryOfOrigin
      }
    })

    if(!country) return Promise.resolve();

    await models.manufacturer.create({
      countryId: country.id,
      name: manufacturer
    })
   }))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('manufacturers', null, {});
  }
};

'use strict';
const { models } = require('../db');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const services = await models.provided_service.findAll()

    await Promise.all(services.map(async(service) => {
      const val = service.dataValues;
      const qty = await service.countDimension_appliances()
      const dimensionDateId = val.dimensionDateId;
      const dimensionLocationId =  val.dimensionLocationId;
      const dimensionManufacturerCountryId =  val.dimensionManufacturerCountryId;

      return await models.fact_service_quantity.create({
        provided_service_id: service.id,
        dimensionDateId,
        dimensionLocationId,
        dimensionManufacturerCountryId,
        quantity: qty
      })
    }))


  },

  async down (queryInterface, Sequelize) {

  }
};

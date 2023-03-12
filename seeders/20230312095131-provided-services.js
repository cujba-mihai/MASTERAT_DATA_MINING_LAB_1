'use strict';
const { models } = require('../db');
const {faker} = require('@faker-js/faker')
const moment = require('moment')
function generateRandomTime() {
  const hours = faker.random.numeric({ min: 0, max: 23 }).toString().padStart(2, '0');
  const minutes = faker.random.numeric({ min: 0, max: 59 }).toString().padStart(2, '0');
  const seconds = faker.random.numeric({ min: 0, max: 59 }).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    const _manufacturers = await models.manufacturer.findAll({ attributes: ['id', 'name'], raw: true})
    const _serviceCenters = await models.service_center.findAll({ attributes: ['id', 'name'], raw: true})
    const _appliances = await models.dimension_appliance.findAll({ attributes: ['id'], raw: true});
    const _dates = await models.dimension_date.findAll({ raw: true });
    const _location = await models.dimension_location.findAll({ raw: true })
    const _manufacturer_countries = await models.dimension_manufacturer_country.findAll({ raw: true });

    const manufacturers = _manufacturers.map(m => m.id)
    const serviceCenters = _serviceCenters.map(m => m.id)
    const appliances = _appliances.map(m => m.id)
    
    for (let i = 0; i < 10_000; i++) {
      const manufacturer = +faker.random.numeric(manufacturers);
      const serviceCenter = +faker.random.numeric(serviceCenters);
      const $appliances = Array(Math.ceil(Math.random() * 5)).fill().map(() => +faker.random.numeric(appliances))

      const date = moment(faker.date.between('2021-01-01', '2022-12-31')).format('YYYY-MM-DD');
      const time = generateRandomTime();
      const name = `${$appliances} - ${date} - ${time}`;
      const timeTillComplete = faker.random.numeric({ min: 1, max: 8 }) + faker.random.numeric({ min: 0, max: 59 }) / 60;

      const dimensionDateId = _dates.find(d => d.fullDate == date).id;

      const serviceCenterName = _serviceCenters.find(center => center.id === serviceCenter).name
      const dimensionLocationId = _location.find(l => l.service_center === serviceCenterName).id
      
      const manufacturerName = _manufacturers.find(m => m.id === manufacturer)?.name
      const dimensionManufacturerCountryId = _manufacturer_countries.find(m => m.manufacturer === manufacturerName).id

      const service = {
        manufacturerId: manufacturer,
        serviceCenterId: serviceCenter,
        appliances: $appliances,
        name: name,
        date: date,
        time: time,  
        time_till_complete: timeTillComplete,
        createdAt: new Date(),
        updatedAt: new Date(),
        dimensionDateId: dimensionDateId,
        dimensionLocationId: dimensionLocationId,
        dimensionManufacturerCountryId: dimensionManufacturerCountryId,
      }

      const createdService = await models.provided_service.create(service);

      createdService.addDimension_appliances(Array.from(new Set($appliances)))
    }


    
    return Promise.resolve()
    } catch(err) {
      throw Error(err)
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

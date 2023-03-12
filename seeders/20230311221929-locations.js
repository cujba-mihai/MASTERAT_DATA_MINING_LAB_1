'use strict';

const { models } = require('../db');
const uniqContinents = [  { name: 'North America' },  { name: 'Asia' },  { name: 'Europe' },  { name: 'South America' },  { name: 'Australia/Oceania' }]
const uniqCountries = [  { name: 'USA', continent: 'North America' },  { name: 'India', continent: 'Asia' },  { name: 'Brazil', continent: 'South America' },  { name: 'UK', continent: 'Europe' },  { name: 'France', continent: 'Europe' },  { name: 'Japan', continent: 'Asia' },  { name: 'Australia', continent: 'Australia/Oceania' },  { name: 'Canada', continent: 'North America' }]
const uniqCities = [  { name: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Sao Paulo', country: 'Brazil', continent: 'South America' },  { name: 'New York', country: 'USA', continent: 'North America' },  { name: 'Chicago', country: 'USA', continent: 'North America' },  { name: 'Los Angeles', country: 'USA', continent: 'North America' },  { name: 'Paris', country: 'France', continent: 'Europe' },  { name: 'London', country: 'UK', continent: 'Europe' },  { name: 'Toronto', country: 'Canada', continent: 'North America' },  { name: 'Tokyo', country: 'Japan', continent: 'Asia' },  { name: 'Sydney', country: 'Australia', continent: 'Australia/Oceania' }]
const uniqServiceCenters = [  { name: 'Mumbai Service Center 5', city: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Mumbai Service Center 4', city: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Mumbai Service Center 3', city: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Mumbai Service Center 2', city: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Mumbai Service Center', city: 'Mumbai', country: 'India', continent: 'Asia' },  { name: 'Sao Paulo Service Center 3', city: 'Sao Paulo', country: 'Brazil', continent: 'South America' },  { name: 'Sao Paulo Service Center 2', city: 'Sao Paulo', country: 'Brazil', continent: 'South America' },  { name: 'Sao Paulo Service Center', city: 'Sao Paulo', country: 'Brazil', continent: 'South America' },  { name: 'New York Service Center', city: 'New York', country: 'USA', continent: 'North America' },  { name: 'Chicago Service Center', city: 'Chicago', country: 'USA', continent: 'North America' },  { name: 'LA Service Center', city: 'Los Angeles', country: 'USA', continent: 'North America' },  { name: 'Paris Service Center', city: 'Paris', country: 'France', continent: 'Europe' },  { name: 'London Service Center', city: 'London', country: 'UK', continent: 'Europe' },  { name: 'Toronto Service Center', city: 'Toronto', country: 'Canada', continent: 'North America' },  { name: 'Tokyo Service Center', city: 'Tokyo', country: 'Japan', continent: 'Asia' },  { name: 'Sydney Service Center', city: 'Sydney', country: 'Australia', continent: 'Australia/Oceania' }]

module.exports = {
  async up(queryInterface, Sequelize) {
    const continents = await models.continent.bulkCreate(uniqContinents)

    const _countries = uniqCountries.map((country) => {
      const continent = continents.find(continent => continent.name === country.continent);

      return ({
        continentId: continent.id,
        name: country.name
      })
    })
    const countries = await models.country.bulkCreate(_countries);
    
    const _cities = uniqCities.map(city => {
      const country = countries.find(country => country.name === city.country);

      return ({
        name: city.name,
        countryId: country.id,
      })
    })

    await models.city.bulkCreate(_cities)


    await Promise.all(uniqServiceCenters.map(async(serviceCenter) => {
      const city = await models.city.findOne({
        where: {
          name: serviceCenter.city
        }
      })

      console.log('CITY IS: ', city)

      return await models.service_center.create({
        name: serviceCenter.name,
        cityId: city.id,
      })
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('continents', null, {});
  },
};

'use strict';

const { models } = require('../db');
const moment = require('moment');

const start = moment('2021-01-01');
const end = moment('2022-12-31');
module.exports = {
  async up(queryInterface, Sequelize) {
    let currentDate = start;
    const dates = [];

    while(currentDate.isSameOrBefore(end)) {
      const year = currentDate.year();
      const fullDate = currentDate.format('YYYY-MM-DD')
      const quarter = Math.ceil((currentDate.month() + 1) / 3); // calculate the quarter based on the month
      const month = currentDate.month() + 1; // add 1 to get the month number in range 1-12
      const week = currentDate.week();
      const day = currentDate.format('dddd');
      const date = currentDate.format('DD');
      const day_of_week = currentDate.day(); // 0 for Sunday, 1 for Monday, etc.
      const day_of_year = currentDate.dayOfYear();



      dates.push({
        fullDate,
        date,
        year,
        quarter,
        month,
        week,
        day,
        day_of_week,
        day_of_year
      })

      currentDate = currentDate.add(1, 'day');
    }
    await models.dimension_date.bulkCreate(dates)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dimension_dates', null, {});
  },
};

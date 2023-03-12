const { Sequelize } = require('sequelize');
const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express();
const port = 3001;
  

const credentials = ['Tehnica_de_uz_casnic', 'mihai', '022387339']

const sequelize = new Sequelize(...credentials, {
    dialect: 'mssql',
    logging: true,
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      options: {
        // Your tedious options here
        useUTC: false,
        dateFirst: 1,
        requestTimeout: 3_000_000,
      },
      driver: require('tedious')
    }
})

exports.sequelize = sequelize;

const models = {};

// Import all models from the models folder
fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file));
    models[model.name] = model;
  });

// Initialize all models
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

// Sync all models with the database
const force = {force: false}
sequelize.sync(force)
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

exports.models = models

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
    
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const config = require('../utils/config');

const Storage = {};

// connect to database
let { database, username, password, host, port, pool={} } = config.storage;
const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  pool: pool,
});

// import and define models
fs.readdirSync(path.join(__dirname, 'models')).forEach(file => {
  let model = sequelize.import(path.join(__dirname, 'models', file));
  Storage[model.name] = model;
});


Storage.sequelize = sequelize;
Storage.Sequelize = Sequelize;

module.exports = Storage;

const path = require('path');
const Sequelize = require('sequelize');
const defineTemperature = require('./models/temperature');
const logger = require('../utils/logger');
const config = require('../utils/config');

class Storage {

  constructor(options) {
    this.options = options;
  }

  connection() {
    let { database, username, password, host, port, pool={} } = config.storage;
    this.sequelize = new Sequelize(database, username, password, {
      dialect: 'mysql',
      pool: pool,
    });
    defineTemperature(this.sequelize);
    logger.info(`start test sqlite connection`);
    return this.sequelize.authenticate().then(() => {
      logger.info('Connection has been established successfully.');
    });
  }

  save({ value, position }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.sync().then(() => {
      return Temperature.create({ value, position });
    });
  }

  get({ startDate, endDate }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.sync().then(() => {
      return Temperature.findAndCountAll({
        where: {
          datetime: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
        order: [
          ['datetime', 'asc'],
        ]
      });
    });
  }

  getLatest() {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.sync().then(() => {
      Temperature.findOne({
        order: [
          ['datetime', 'desc'],
        ]
      });
    });
  }

}

module.exports = Storage;

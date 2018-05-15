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
    logger.info(`start test sqlite connection`);
    return this.sequelize.authenticate().then(() => {
      defineTemperature(this.sequelize);
      return Promise.all([
        this.sequelize.model('Temperature').sync(),
      ]);
    }).then(() => {
      logger.info('Connection has been established successfully.');
    });
  }

  save({ value, position }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.create({ value, position });
  }

  get({ startDate, endDate }) {
    const Temperature = this.sequelize.model('Temperature');
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
  }

  getLatest() {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.findOne({
      order: [
        ['datetime', 'desc'],
      ]
    });
  }

  getAverage({ startDate, endDate }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.findOne({
      attributes: [
        [Temperature.sequelize.fn('AVG', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        datetime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      }
    });
  }

  getMax({ startDate, endDate }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.findOne({
      attributes: [
        [Temperature.sequelize.fn('MAX', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        datetime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      }
    });
  }

  getMin({ startDate, endDate }) {
    const Temperature = this.sequelize.model('Temperature');
    return Temperature.findOne({
      attributes: [
        [Temperature.sequelize.fn('MIN', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        datetime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      }
    });
  }

}

module.exports = Storage;

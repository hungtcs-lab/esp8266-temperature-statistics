const path = require('path');
const Sequelize = require('sequelize');
const defineTemperature = require('./models/temperature');
const logger = require('../utils/logger');

class Storage {

  constructor(options) {
    this.options = options;
  }

  connection() {
    this.sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      storage: path.join(__dirname, '../../data/database.sqlite'),
      pool: {
        max: 2,
        idle: 30000,
        acquire: 60000,
      },
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

}

module.exports = Storage;

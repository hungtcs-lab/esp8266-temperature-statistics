const  { Sequelize, sequelize, Temperature } = require('../storage');

module.exports = {
  save({ value, position }) {
    return Temperature.create({ value, position });
  },
  getList({ startDate, endDate }) {
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
  },
  getLatest() {
    return Temperature.findOne({
      order: [
        ['datetime', 'desc'],
      ]
    });
  },
  getAverage({ startDate, endDate }) {
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
  },
  getMax({ startDate, endDate }) {
    return Temperature.findOne({
      attributes: [
        [Temperature.sequelize.fn('MAX', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        datetime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      }
    }).then(({ value }) => {
      return Temperature.findAndCountAll({
        where: {
          datetime: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
          value: {
            [Sequelize.Op.eq]: value,
          },
        }
      }).then(({ count, rows }) => {
        return { count, list: rows, value };
      });
    });
  },
  getMin({ startDate, endDate }) {
    return Temperature.findOne({
      attributes: [
        [Temperature.sequelize.fn('MIN', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        datetime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      }
    }).then(({ value }) => {
      return Temperature.findAndCountAll({
        where: {
          datetime: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
          value: {
            [Sequelize.Op.eq]: value,
          },
        }
      }).then(({ count, rows }) => {
        return { count, list: rows, value };
      });
    });
  },
  getAverageOfWeek() {
    return Temperature.findAll({
      attributes: [
        [Temperature.sequelize.fn('dayofweek', Temperature.sequelize.col('datetime')), 'dayofweek'],
        [Temperature.sequelize.fn('AVG', Temperature.sequelize.col('value')), 'value'],
      ],
      where: {
        [Sequelize.Op.and]: [
          sequelize.where(sequelize.fn('week', Temperature.sequelize.fn('now')), sequelize.fn('week', Temperature.sequelize.col('datetime'))),
        ]
      },
      group: sequelize.fn('dayofweek', Temperature.sequelize.col('datetime')),
    });
  },
};

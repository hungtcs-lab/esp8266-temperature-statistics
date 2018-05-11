const path = require('path');
const config = require('./config');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {
      type: 'stdout',
    },
    logfile: {
      type: 'dateFile',
      filename: path.join(__dirname, '../../logs/logfile.log'),
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      daysToKeep: 90,
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug',
    },
    development: {
      appenders: ['console'],
      level: 'debug',
    },
    production: {
      appenders: ['console', 'logfile'],
      level: 'info',
    }
  }
});

module.exports = log4js.getLogger(config.logger.category || 'development');

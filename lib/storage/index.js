const path = require('path');
const Sequelize = require('sequelize');

class Storage {

  constructor() {
    this._connection();
  }

  _connection() {
    this.sequelize = new Sequelize('database', 'username', 'password', {
      dialect: 'sqlite',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      storage: path.join(__dirname, '../../data/database.sqlite')
    });
  }

  _test() {
    this.sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }

}

module.exports = Storage;

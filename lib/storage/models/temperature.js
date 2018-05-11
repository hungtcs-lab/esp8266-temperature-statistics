const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const Temperature = sequelize.define('Temperature', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    datetime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Temperature;
};

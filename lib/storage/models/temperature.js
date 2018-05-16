/**
 * the temperature module define
 * @param  {[type]} sequelize [description]
 * @param  {[type]} Sequelize [description]
 * @return {[type]}           [description]
 */
module.exports = function(sequelize, Sequelize) {
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'instrumento', 
      { 
        id_instrumento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: false
        },
        instrumento: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('instrumento');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tecnico', 
      { 
        id_tecnico: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: false
        },
        habilidade_tecnica: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        } 
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tecnico');
  }
};

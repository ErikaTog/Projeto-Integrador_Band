'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'tipos_perfil', 
      { 
        id_tipos_perfil: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: false
        },
        tipo: {
          type: Sequelize.STRING(45),
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tipos_perfil');
  }
};

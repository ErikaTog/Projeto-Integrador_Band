'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'musico_tecnicos', 
      { 
        id_musico: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'musico',
            key: 'id_musico'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        id_tecnico: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'tecnico',
            key: 'id_tecnico'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('musico_tecnicos');
  }
};

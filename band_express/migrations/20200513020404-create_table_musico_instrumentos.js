'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'musico_instrumentos', 
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
        id_instrumento: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'instrumento',
            key: 'id_instrumento'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('musico_instrumentos');
  }
};

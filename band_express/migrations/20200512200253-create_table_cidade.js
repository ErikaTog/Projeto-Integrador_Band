'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'cidade', 
      { 
        id_cidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING(120),
          allowNull: false
        },
        id_estado: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'estado',
            key: 'id_estado'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cidade');
  }
};

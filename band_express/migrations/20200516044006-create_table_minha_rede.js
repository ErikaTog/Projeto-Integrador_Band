'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'minha_rede', 
      {
        id_minha_rede: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        id_usuario: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'usuario',
            key: 'id_usuario'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        id_usuario_seguido: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'usuario',
            key: 'id_usuario'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('minha_rede');
  }
};

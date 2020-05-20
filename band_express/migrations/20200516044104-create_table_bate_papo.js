'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'bate_papo', 
      {
        id_bate_papo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        mensagem: {
          type: Sequelize.STRING(500),
          allowNull: false
        },
        hora_data: {
          type: Sequelize.DATE,
          allowNull: false
        },
        id_usuario_remetente: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'usuario',
            key: 'id_usuario'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        id_usuario_destinatario: {
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
      return queryInterface.dropTable('bate_papo');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'vagas', 
      {
        id_vagas: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        titulo: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        descricao: {
          type: Sequelize.STRING(200),
          allowNull: false
        },
        cidade_vaga: {
          type: Sequelize.STRING(120),
          allowNull: false
        },
        estado_vaga: {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        tipo_vaga: {
          type: Sequelize.STRING(15),
          allowNull: false
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
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vagas');
  }
};

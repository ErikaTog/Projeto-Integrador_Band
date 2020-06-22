'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'anuncie', 
      {
        id_anuncie: {
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
        cidade_produto: {
          type: Sequelize.STRING(120),
          allowNull: false
        },
        estado_produto: {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        valor: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          allowNull: false
        },
        img_anuncio: {
          type: Sequelize.STRING(256),
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
      return queryInterface.dropTable('anuncie');
  }
};

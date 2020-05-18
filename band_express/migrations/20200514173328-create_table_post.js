'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
      id_post: {
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
      texto: {
        type: Sequelize.STRING(2220),
        allowNull: false
      },
      imagem: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      curtido: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0',
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post');
  }
};

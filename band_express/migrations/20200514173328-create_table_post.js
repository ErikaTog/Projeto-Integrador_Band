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
      video_arquivo: {
        type: Sequelize.STRING
      },
      video_link: {
        type: Sequelize.STRING
      },
      data_post: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('post');
  }
};

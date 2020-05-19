'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fale_conosco', {
      id_fale_conosco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      assunto: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      mensagem: {
        type: Sequelize.STRING(500),
        allowNull: false
      } 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fale_conosco');
  }
};

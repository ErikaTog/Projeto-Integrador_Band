'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('banda', {
      id_banda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      genero: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      sobre: {
        type: Sequelize.STRING(2200),
        allowNull: true
      },
      site: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      canal: {
        type: Sequelize.STRING(100),
        allowNull: true
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('banda');
  }
};
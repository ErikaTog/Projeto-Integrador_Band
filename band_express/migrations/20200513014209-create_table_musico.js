'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'musico', 
      {
        id_musico: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        sexo: {
          type: Sequelize.STRING(1),
          allowNull: false
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
        canto: {
          type: Sequelize.BOOLEAN,
          defaultValue: '0',
          allowNull: false
        },
        toco: {
          type: Sequelize.BOOLEAN,
          defaultValue: '0',
          allowNull: false
        },
        tecnico: {
          type: Sequelize.BOOLEAN,
          defaultValue: '0',
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
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('musico');
  }
};

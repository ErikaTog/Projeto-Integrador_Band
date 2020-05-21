'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'usuario', 
      { 
        id_usuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        senha: {
            type: Sequelize.STRING(256),
            allowNull: false
        },
        data_cadastro: {
            type: Sequelize.DATE,
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
        },
        id_cidade: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'cidade',
            key: 'id_cidade'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: '0',
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING(256),
            defaultValue: '/img/avatar_zero.png',
            allowNull: false
        },
        wallpaper: {
            type: Sequelize.STRING(256),
            defaultValue: '/img/fundo_zero.png',
            allowNull: false
        },
        link_perfil: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        id_tipos_perfil: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          references: {
            model: 'tipos_perfil',
            key: 'id_tipos_perfil'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        } 
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('usuario');
  }
};

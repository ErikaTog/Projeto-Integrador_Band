'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'estabelecimento', 
      {
        id_estab: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        categoria: {
          type: Sequelize.STRING(45),
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
        telefone: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        funcionamento: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
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
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('estabelecimento');
  }
};

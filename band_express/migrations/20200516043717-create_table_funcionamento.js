'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'funcionamento', 
      {
        id_funcionamento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        dia: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        horario_abertura: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        horario_fechamento: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        id_estab: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'estabelecimento',
            key: 'id_estab'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funcionamento');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('banda_integrantes', {
      id_banda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'banda',
          key: 'id_banda'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_integrante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },  
      funcao: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('banda_integrantes');
  }
};

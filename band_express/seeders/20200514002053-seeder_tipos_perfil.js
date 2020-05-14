'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'tipos_perfil', [
          {
            id_tipos_perfil: 1,
            tipo: 'Músico'
          },
          {
            id_tipos_perfil: 2,
            tipo: 'Banda'
          },
          {
            id_tipos_perfil: 3,
            tipo: 'Estabelecimento'
          } 
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tipos_perfil', null, {});
  }
};

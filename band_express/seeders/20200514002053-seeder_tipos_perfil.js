'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        'tipos_perfil', [
          {
            tipo: 'Músico'
          },
          {
            tipo: 'Banda'
          },
          {
            tipo: 'Estabelecimento'
          }
        ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tipos_perfil', null, {});
  }
};

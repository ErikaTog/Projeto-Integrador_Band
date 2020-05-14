'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico_tecnicos', [
        {
          id_musico: 1,
          id_tecnico: 4,
        },
        {
          id_musico: 2,
          id_tecnico: 1,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico_tecnicos', null, {});
  }
};

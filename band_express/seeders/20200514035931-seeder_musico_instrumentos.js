'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico_instrumentos', [
        {
          id_musico: 1,
          id_instrumento: 436,
        },
        {
          id_musico: 2,
          id_instrumento: 356,
        },
        {
          id_musico: 3,
          id_instrumento: 409,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico_instrumentos', null, {});
  }
};

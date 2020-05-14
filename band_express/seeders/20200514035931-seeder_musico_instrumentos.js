'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico_instrumentos', [
        {
          id_musico: 1,
          id_instrumento: 79,
        },
        {
          id_musico: 2,
          id_instrumento: 60,
        },
        {
          id_musico: 3,
          id_instrumento: 7,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico_instrumentos', null, {});
  }
};

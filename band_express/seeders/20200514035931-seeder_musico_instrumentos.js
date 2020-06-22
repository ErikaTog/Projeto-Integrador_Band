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
        },
        {
          id_musico: 7,
          id_instrumento: 82,
        },
        {
          id_musico: 7,
          id_instrumento: 11,
        },
        {
          id_musico: 7,
          id_instrumento: 83,
        },
        {
          id_musico: 7,
          id_instrumento: 87,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico_instrumentos', null, {});
  }
};

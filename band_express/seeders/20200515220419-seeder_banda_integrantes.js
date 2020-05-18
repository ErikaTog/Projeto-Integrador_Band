'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banda_integrantes', [
        {
          id_banda: 1,
          id_integrante: 4,
          funcao: "Vocalista"
        },
        {
          id_banda: 1,
          id_integrante: 5,
          funcao: "Guitarrista"
        },
        {
          id_banda: 2,
          id_integrante: 4,
          funcao: "Vocalista"
        },
        {
          id_banda: 2,
          id_integrante: 2,
          funcao: "Baterista"
        },
        {
          id_banda: 2,
          id_integrante: 5,
          funcao: "Guitarrista"
        },
        {
          id_banda: 3,
          id_integrante: 2,
          funcao: "Saxofonista"
        },
        {
          id_banda: 3,
          id_integrante: 4,
          funcao: "Pianista"
        },
        {
          id_banda: 3,
          id_integrante: 5,
          funcao: "Baixista"
        }  
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banda_integrantes', null, {});
  }
};

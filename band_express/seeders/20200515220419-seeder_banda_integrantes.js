'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banda_integrantes', [
        {
          id_banda: 1,
          id_integrante: 2,
          funcao: "Vocalista"
        },
        {
          id_banda: 1,
          id_integrante: 4,
          funcao: "Pianista"
        },
        {
          id_banda: 2,
          id_integrante: 5,
          funcao: "Vocalista"
        },
        {
          id_banda: 2,
          id_integrante: 10,
          funcao: "Baterista"
        },
        {
          id_banda: 2,
          id_integrante: 11,
          funcao: "Guitarrista"
        },
        {
          id_banda: 2,
          id_integrante: 16,
          funcao: "Baixista"
        },
        {
          id_banda: 3,
          id_integrante: 14,
          funcao: "Saxofonista"
        },
        {
          id_banda: 3,
          id_integrante: 15,
          funcao: "Vocalista"
        },
        {
          id_banda: 4,
          id_integrante: 14,
          funcao: "Baterista"
        },
        {
          id_banda: 5,
          id_integrante: 10,
          funcao: "Violão"
        },
        {
          id_banda: 6,
          id_integrante: 15,
          funcao: "Pianista"
        },
        {
          id_banda: 7,
          id_integrante: 12,
          funcao: "Triângulo"
        },
        {
          id_banda: 8,
          id_integrante: 13,
          funcao: "Vocalista"
        }     
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banda_integrantes', null, {});
  }
};

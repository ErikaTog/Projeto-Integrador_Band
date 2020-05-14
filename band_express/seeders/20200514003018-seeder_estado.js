'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'estado', [
        {
          id_estado: 1,
          uf: "AC"
        },
        {
          id_estado: 2,
          uf: "AL"
        },
        {
          id_estado: 3,
          uf: "AM"
        },
        {
          id_estado: 4,
          uf: "AP"
        },
        {
          id_estado: 5,
          uf: "BA"
        },
        {
          id_estado: 6,
          uf: "CE"
        },
        {
          id_estado: 7,
          uf: "DF"
        },
        {
          id_estado: 8,
          uf: "ES"
        },
        {
          id_estado: 9,
          uf: "GO"
        },
        {
          id_estado: 10,
          uf: "MA"
        },
        {
          id_estado: 11,
          uf: "MG"
        },
        {
          id_estado: 12,
          uf: "MS"
        },
        {
          id_estado: 13,
          uf: "MT"
        },
        {
          id_estado: 14,
          uf: "PA"
        },
        {
          id_estado: 15,
          uf: "PB"
        },
        {
          id_estado: 16,
          uf: "PE"
        },
        {
          id_estado: 17,
          uf: "PI"
        },
        {
          id_estado: 18,
          uf: "PR"
        },
        {
          id_estado: 19,
          uf: "RJ"
        },
        {
          id_estado: 20,
          uf: "RN"
        },
        {
          id_estado: 21,
          uf: "RO"
        },
        {
          id_estado: 22,
          uf: "RR"
        },
        {
          id_estado: 23,
          uf: "RS"
        },
        {
          id_estado: 24,
          uf: "SC"
        },
        {
          id_estado: 25,
          uf: "SE"
        },
        {
          id_estado: 26,
          uf: "SP"
        },
        {
          id_estado: 27,
          uf: "TO"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estado', null, {});
  }
};
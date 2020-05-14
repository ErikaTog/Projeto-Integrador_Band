'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'estado', [{
          uf: 'AC'
        },
        {
          uf: 'AL'
        },
        {
          uf: 'AM'
        },
        {
          uf: 'AP'
        },
        {
          uf: 'BA'
        },
        {
          uf: 'CE'
        },
        {
          uf: 'DF'
        },
        {
          uf: 'ES'
        },
        {
          uf: 'GO'
        },
        {
          uf: 'MA'
        },
        {
          uf: 'MG'
        },
        {
          uf: 'MS'
        },
        {
          uf: 'MT'
        },
        {
          uf: 'PA'
        },
        {
          uf: 'PB'
        },
        {
          uf: 'PE'
        },
        {
          uf: 'PI'
        },
        {
          uf: 'PR'
        },
        {
          uf: 'RJ'
        },
        {
          uf: 'RN'
        },
        {
          uf: 'RO'
        },
        {
          uf: 'RR'
        },
        {
          uf: 'RS'
        },
        {
          uf: 'SC'
        },
        {
          uf: 'SE'
        },
        {
          uf: 'SP'
        },
        {
          uf: 'TO'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estado', null, {});
  }
};
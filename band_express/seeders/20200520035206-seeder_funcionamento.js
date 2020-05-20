'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'funcionamento', [
        {
          dia: 'Segunda',
          horario_abertura: '08:00',
          horario_fechamento: '17:00',
          id_estab: 1
        },
        {
          dia: 'Terça',
          horario_abertura: '08:00',
          horario_fechamento: '17:00',
          id_estab: 1
        },
        {
          dia: 'Quarta',
          horario_abertura: '08:00',
          horario_fechamento: '17:00',
          id_estab: 1
        },
        {
          dia: 'Quinta',
          horario_abertura: '08:00',
          horario_fechamento: '17:00',
          id_estab: 1
        },
        {
          dia: 'Sexta',
          horario_abertura: '08:00',
          horario_fechamento: '17:00',
          id_estab: 1
        },
        {
          dia: 'Sabado',
          horario_abertura: '22:00',
          horario_fechamento: '02:00',
          id_estab: 2
        },
        {
          dia: 'Domingo',
          horario_abertura: '22:00',
          horario_fechamento: '02:00',
          id_estab: 2
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('funcionamento', null, {});
  }
};

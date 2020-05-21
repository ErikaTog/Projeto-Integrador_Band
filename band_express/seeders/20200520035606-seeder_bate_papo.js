'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'bate_papo', [
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data:  new Date(),
          id_usuario_remetente: 1,
          id_usuario_destinatario: 2
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-17 20:43:30',
          id_usuario_remetente: 2,
          id_usuario_destinatario: 1
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 22:43:30',
          id_usuario_remetente: 3,
          id_usuario_destinatario: 4
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 21:43:30',
          id_usuario_remetente: 4,
          id_usuario_destinatario: 3
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 10:43:30',
          id_usuario_remetente: 5,
          id_usuario_destinatario: 6
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 05:43:30',
          id_usuario_remetente: 6,
          id_usuario_destinatario: 5
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 15:43:30',
          id_usuario_remetente: 7,
          id_usuario_destinatario: 8
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 14:43:30',
          id_usuario_remetente: 8,
          id_usuario_destinatario: 7
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 18:43:30',
          id_usuario_remetente: 9,
          id_usuario_destinatario: 1
        },
        {
          mensagem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.",
          hora_data: '2020-05-16 18:43:30',
          id_usuario_remetente: 1,
          id_usuario_destinatario: 9
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bate_papo', null, {});
  }
};

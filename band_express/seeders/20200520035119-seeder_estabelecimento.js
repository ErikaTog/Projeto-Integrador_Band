'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'estabelecimento', [
        {
          categoria: 'Loja',
          sobre: 'Loja - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.lojaandy.com',
          email: 'loja_andy@gmail.com',
          telefone: '911112222',
          funcionamento: 1,
          id_usuario: 3
        },
        {
          categoria: 'Restaurante',
          sobre: 'Jack Doe Restaurante - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.jackdoerestaurante.com',
          email: 'jack_doe_restaurante@mail.com',
          telefone: '933334444',
          funcionamento: 1,
          id_usuario: 7
        },
        {
          categoria: 'Bar/Pub',
          sobre: 'Beth Bar - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.beth_bar.com',
          email: 'beth_bar@mail.com',
          telefone: '977778888',
          funcionamento: 0,
          id_usuario: 9
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estabelecimento', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'estabelecimento', [
        {
          categoria: 'Loja',
          sobre: 'Loja - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.lojaandy.com',
          telefone: '911112222',
          funcionamento: 1,
          id_usuario: 3
        },
        {
          categoria: 'Restaurante',
          sobre: 'Jack Doe Restaurante - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.jackdoerestaurante.com',
          telefone: '933334444',
          funcionamento: 1,
          id_usuario: 7
        },
        {
          categoria: 'Bar/Pub',
          sobre: 'Beth Bar - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.beth_bar.com',
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

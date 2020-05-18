'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banda', [
        {
          genero: "Soul",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.bandaerika.com.br',
          canal: 'youtube.com/bandaerika',
          email: 'bandaerika@gmail.com',
          id_usuario: 1
        },
        {
          genero: "Reggae",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.osfarofeiros.com.br',
          canal: 'youtube.com/osfarofeiros',
          email: 'farofeirosbanda@yahoo.com',
          id_usuario: 6
        },
        {
          genero: "Jazz",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.lmeventos.com.br',
          canal: 'youtube.com/lmeventos',
          email: 'lmeventos@gmail.com',
          id_usuario: 8
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('banda', null, {});
  }
};

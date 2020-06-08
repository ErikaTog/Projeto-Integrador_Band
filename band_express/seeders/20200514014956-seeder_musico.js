'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico', [
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'youtube',
          canto: 0,
          toco: 1,
          tecnico: 1,
          id_usuario: 2,
        },
        {
          sexo: 'O',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.Jane.com',
          canal: 'channelJane',
          canto: 1,
          toco: 1,
          tecnico: 1,
          id_usuario: 4,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.John.com',
          canal: 'channelJohn',
          canto: 1,
          toco: 1,
          tecnico: 0,
          id_usuario: 5,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 10,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 11,
        },
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 12,
        },
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 13,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 14,
        },
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 15,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 16,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.',
          canal: 'meu canal',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 17,
        }        
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico', null, {});
  }
};

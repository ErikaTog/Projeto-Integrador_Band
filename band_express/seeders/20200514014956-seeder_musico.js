'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico', [
        {
          sexo: 'F',
          sobre: 'Publico diariamente conteúdos interessantes ⭐',
          site: 'www.paty.com',
          canal: 'www.youtube.com/paty',
          canto: 0,
          toco: 1,
          tecnico: 1,
          id_usuario: 2,
        },
        {
          sexo: 'O',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.Jane.com',
          canal: 'www.channelJane.com',
          canto: 1,
          toco: 1,
          tecnico: 1,
          id_usuario: 4,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.John.com',
          canal: 'www.channelJohn.com',
          canto: 1,
          toco: 1,
          tecnico: 0,
          id_usuario: 5,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.andre.com',
          canal: 'www.channelAndre.com',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 10,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.gab.com',
          canal: 'www.channelgab.com',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 11,
        },
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.sandra.com',
          canal: 'www.channel.com/sandra',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 12,
        },
        {
          sexo: 'F',
          sobre: `Olá! Sou uma cantora, compositora e multi-instrumentalista. 
Comecei a cantar na infância, com meus avós e pais. Na adolescência participei como violinista na Orquestra Municipal De São Paulo e também no Conservatório Dramático e Musical de São Paulo. Me formei em música pela USP e também participei do seu coral. 
Atualmente, participo da banda Tribo e toco violão, banjo, violino e sanfona. Música é minha paixão e meu combustível diário. 
Aqui no meu perfil vocês podem conhecer um pouco mais sobre o meu trabalho e entrar em contato comigo pelos meus contatos! Espero que gostem e que minha música possa tocá-los de alguma forma!!`,
          site: 'www.adyla.com',
          canal: 'www.youtube.com/adyla',
          canto: 1,
          toco: 1,
          tecnico: 0,
          id_usuario: 13,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.beto.com',
          canal: 'www.youtube.com/beto',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 14,
        },
        {
          sexo: 'F',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.lilian.com',
          canal: 'www.channel.com/lilian',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 15,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.edu.com',
          canal: 'www.channel.com/edu',
          canto: 1,
          toco: 0,
          tecnico: 0,
          id_usuario: 16,
        },
        {
          sexo: 'M',
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.trops.com',
          canal: 'www.channel.com/trops',
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

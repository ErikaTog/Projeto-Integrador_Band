'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'banda', [
        {
          genero: "Pop",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.bandaerika.com.br',
          canal: 'youtube.com/bandaerika',          
          id_usuario: 1
        },
        {
          genero: "Reggae",
          sobre: `Somos uma banda de 4 amigos do litoral norte Paulista. Somos apaixonados por música e pelo mar.
Embora a sonoridade do reggae seja um elemento importante em nosso som, não queremos que as pessoas esperem somente reggae da gente, já que nós definitivamente fazemos todos os tipos de música. 
Já gravamos 3 álbuns e abaixo estão alguns de nossos trabalhos. Esperamos que curtam o som!`,
          site: 'www.osfarofeiros.com.br',
          canal: 'youtube.com/osfarofeiros',
          id_usuario: 6
        },
        {
          genero: "Jazz",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.lmeventos.com.br',
          canal: 'youtube.com/lmeventos',          
          id_usuario: 8
        },
        {
          genero: "Rock",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.legiaorural.com.br',
          canal: 'youtube.com/legiaorural',          
          id_usuario: 19
        },
        {
          genero: "MPB",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.sorocabanos.com.br',
          canal: 'youtube.com/sorocabanos',          
          id_usuario: 20 
        },
        {
          genero: "Jazz",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.alljazz.com.br',
          canal: 'youtube.com/alljazz',          
          id_usuario: 21
        },
        {
          genero: "Forró",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.marias.com.br',
          canal: 'youtube.com/marias',          
          id_usuario: 22 
        },
        {
          genero: "Rock",
          sobre: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          site: 'www.tribo.com.br',
          canal: 'youtube.com/tribo',          
          id_usuario: 23 
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('banda', null, {});
  }
};

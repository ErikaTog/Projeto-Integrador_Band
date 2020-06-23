'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'estabelecimento', [
        {
          categoria: 'Loja',
          sobre: `Loja Andy referência em instrumentos musicais na internet!
Encontre tudo que precisa como instrumentos, tudo pra áudio, acessórios para músicos exigentes, discos antigos e muito mais. 
Para entrar em contato ou ver nossos produtos acesse o nosso site!`,
          site: 'www.lojaandy.com',
          telefone: '(11) 98765-4321',
          funcionamento: 1,
          id_usuario: 3
        },
        {
          categoria: 'Restaurante',
          sobre: 'Jack Doe Restaurante - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.jackdoerestaurante.com',
          telefone: '(11) 98765-4321',
          funcionamento: 1,
          id_usuario: 7
        },
        {
          categoria: 'Bar/Pub',
          sobre: 'Beth Bar - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.beth_bar.com',
          telefone: '(11) 98765-4321',
          funcionamento: 0,
          id_usuario: 9
        },
        {
          categoria: 'Outro',
          sobre: 'Rio Eventos - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.rio_eventos.com',
          telefone: '(11) 98765-4321',
          funcionamento: 0,
          id_usuario: 18
        },
        {
          categoria: 'Estúdio',
          sobre: 'Frequência Estúdio - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.frequencia.com',
          telefone: '(11) 98765-4321',
          funcionamento: 0,
          id_usuario: 24
        },
        {
          categoria: 'Escola de música',
          sobre: 'Escola de música Aprendendo Notas - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada nisl.',
          site: 'www.aprendendonotas.com',
          telefone: '(11) 98765-4321',
          funcionamento: 0,
          id_usuario: 25
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('estabelecimento', null, {});
  }
};

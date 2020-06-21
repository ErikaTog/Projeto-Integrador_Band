'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'anuncie', [
        {
          titulo: 'Titulo Anuncio 01',
          descricao: 'Descrição Anuncio 01 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 2,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 1
        },
        {
          titulo: 'Titulo Anuncio 02',
          descricao: 'Descrição Anuncio 02 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 10,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 2
        },
        {
          titulo: 'Titulo Anuncio 03',
          descricao: 'Descrição Anuncio 03 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 79.99,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 3
        },
        {
          titulo: 'Titulo Anuncio 04',
          descricao: 'Descrição Anuncio 04 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 100,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 4
        },
        {
          titulo: 'Titulo Anuncio 05',
          descricao: 'Descrição Anuncio 05 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 149.99,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 5
        },
        {
          titulo: 'Titulo Anuncio 06',
          descricao: 'Descrição Anuncio 06 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 200,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 6
        },
        {
          titulo: 'Titulo Anuncio 07',
          descricao: 'Descrição Anuncio 07 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 310.25,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 7
        },
        {
          titulo: 'Titulo Anuncio 08',
          descricao: 'Descrição Anuncio 08 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 420.8,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 8
        },
        {
          titulo: 'Titulo Anuncio 09',
          descricao: 'Descrição Anuncio 09 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 500,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 9
        },
        {
          titulo: 'Titulo Anuncio 10',
          descricao: 'Descrição Anuncio 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          valor: 555.55,
          img_anuncio: '/img/imgEditar.png',
          id_usuario: 1
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anuncie', null, {});
  }
};

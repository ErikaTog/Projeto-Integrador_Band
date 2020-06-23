'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'anuncie', [
        {
          titulo: 'Violão',
          descricao: 'Violão novo, nas compras parceladas em até 3x ganhe um conjunto de cordas extras. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'Sorocaba',
          estado_produto: 'SP',
          valor: 310.25,
          img_anuncio: '/img/uploads/produto1-1592893618624.jpg',
          id_usuario: 1
        },
        {
          titulo: 'Radio retrô',
          descricao: 'Radio AM/FM retrô ideal para decorações vintage! Violão novo, nas compras parceladas em até 3x ganhe um conjunto de cordas extras. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'Mairiporã',
          estado_produto: 'SP',
          valor: 249.99,
          img_anuncio: '/img/uploads/produto2-1592893618619.jpg',
          id_usuario: 2
        },
        {
          titulo: 'Fone de ouvido',
          descricao: 'Fone de ouvido novo com nota fiscal. Oferece uma experiência sonora de alta qualidade e bloqueia ativamente os ruídos externos, calibra o áudio em tempo real para preservar a nitidez, o alcance e toda a emoção do seu som.',
          cidade_produto: 'Carapicuíba',
          estado_produto: 'SP',
          valor: 100.00,
          img_anuncio: '/img/uploads/produto3-1592893618620.jpg',
          id_usuario: 3
        },
        {
          titulo: 'Piano',
          descricao: 'Vende-se piano com 2 anos de uso. Interessados entrar em contato via email. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'São Paulo',
          estado_produto: 'SP',
          valor: 2200.00,
          img_anuncio: '/img/uploads/produto4-1592893618621.jpg',
          id_usuario: 4
        },
        {
          titulo: 'Método para piano',
          descricao: 'Vende-se método novo para alunos iniciantes no piano. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'São Paulo',
          estado_produto: 'SP',
          valor: 19.99,
          img_anuncio: '/img/uploads/produto5-1592893618622.jpg',
          id_usuario: 5
        },
        {
          titulo: 'Bateria',
          descricao: 'Vende-se bateria seminova, após compra retirar no local. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'São Paulo',
          estado_produto: 'SP',
          valor: 8999.99,
          img_anuncio: '/img/uploads/produto6-1592893618623.jpg',
          id_usuario: 6
        },
        {
          titulo: 'Gaita',
          descricao: 'Vende-se gaita de ótima qualidade e com pouco uso. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'Viseu',
          estado_produto: 'PA',
          valor: 79.99,
          img_anuncio: '/img/uploads/produto7-1592893618618.jpg',
          id_usuario: 7
        },
        {
          titulo: 'Violoncelo',
          descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          cidade_produto: 'São Paulo',
          estado_produto: 'SP',
          valor: 700.00,
          img_anuncio: '/img/uploads/produto8-1592893618625.jpg',
          id_usuario: 8
        },
        {
          titulo: 'Microfone',
          descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ipsum rem quae ea aperiam alias molestiae architecto cumque, possimus neque.',
          cidade_produto: 'Sorocaba',
          estado_produto: 'SP',
          valor: 499.99,
          img_anuncio: '/img/uploads/produto9-1592893618626.jpg',
          id_usuario: 9
        },
        {
          titulo: 'Guitarra',
          descricao: 'Guitarra autografada pela banda Tribo!!! Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          cidade_produto: 'Sorocaba',
          estado_produto: 'SP',
          valor: 899.99,
          img_anuncio: '/img/uploads/produto10-1592893618627.jpg',
          id_usuario: 1
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anuncie', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'comentario', [
        {
          id_post: 1,
          id_usuario: 2,
          comentario: "Arrasaram!"
        },
        {
          id_post: 1,
          id_usuario: 6,
          comentario: "Ficou muito top!"
        },
        {
          id_post: 2,
          id_usuario: 1,
          comentario: "Opa, marcado na minha agenda!"
        },
        {
          id_post: 8,
          id_usuario: 6,
          comentario: "Ótimo trabalho."
        },
        {
          id_post: 6,
          id_usuario: 6,
          comentario: "Mandou bem demais!"
        },
        {
          id_post: 5,
          id_usuario: 6,
          comentario: "É por isso que o John é nosso vocalista. Manda muito bem!"
        },
        {
          id_post: 5,
          id_usuario: 15,
          comentario: "John vem cantar na minha cidade! Sou super fã!"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    Example:
      return queryInterface.bulkDelete('comentario', null, {});
  
  }
};

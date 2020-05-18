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
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    Example:
      return queryInterface.bulkDelete('comentario', null, {});
  
  }
};
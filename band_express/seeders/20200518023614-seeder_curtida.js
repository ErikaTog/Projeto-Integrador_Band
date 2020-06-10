'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'curtida', [
        {
          id_post: 1,
          id_usuario: 2,
        },
        {
          id_post: 1,
          id_usuario: 4,
        },
        {
          id_post: 1,
          id_usuario: 7,
        },
        {
          id_post: 1,
          id_usuario: 9,
        }, 
        {
          id_post: 2,
          id_usuario: 1,
        },
        {
          id_post: 2,
          id_usuario: 3,
        },
        {
          id_post: 3,
          id_usuario: 4,
        },
        {
          id_post: 3,
          id_usuario: 1,
        },
        {
          id_post: 3,
          id_usuario: 9,
        }, 
      ], {});
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('curtida', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'minha_rede', [
        {
          id_usuario: 1,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 1,
          id_usuario_seguido: 3
        },
        {
          id_usuario: 1,
          id_usuario_seguido: 4
        },
        {
          id_usuario: 2,
          id_usuario_seguido: 3
        },
        {
          id_usuario: 2,
          id_usuario_seguido: 4
        },
        {
          id_usuario: 2,
          id_usuario_seguido: 5
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 4
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 5
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 6
        },
        {
          id_usuario: 4,
          id_usuario_seguido: 5
        },
        {
          id_usuario: 4,
          id_usuario_seguido: 6
        },
        {
          id_usuario: 5,
          id_usuario_seguido: 6
        },
        {
          id_usuario: 5,
          id_usuario_seguido: 7
        },
        {
          id_usuario: 6,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 6,
          id_usuario_seguido: 4
        },
        {
          id_usuario: 6,
          id_usuario_seguido: 5
        },
        {
          id_usuario: 7,
          id_usuario_seguido: 8
        },
        {
          id_usuario: 7,
          id_usuario_seguido: 9
        },
        {
          id_usuario: 8,
          id_usuario_seguido: 9
        },
        {
          id_usuario: 8,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 9,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 9,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 9,
          id_usuario_seguido: 6
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 3
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 5
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 9
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 12
        },
        {
          id_usuario: 13,
          id_usuario_seguido: 18
        },
        {
          id_usuario: 1,
          id_usuario_seguido: 13
        },
        {
          id_usuario: 2,
          id_usuario_seguido: 13
        },
        {
          id_usuario: 4,
          id_usuario_seguido: 13
        },
        {
          id_usuario: 6,
          id_usuario_seguido: 13
        },
        {
          id_usuario: 24,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 24,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 24,
          id_usuario_seguido: 3
        },
        {
          id_usuario: 25,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 25,
          id_usuario_seguido: 2
        },
        {
          id_usuario: 25,
          id_usuario_seguido: 3
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 24
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 25
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 1
        },
        {
          id_usuario: 3,
          id_usuario_seguido: 2
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('minha_rede', null, {});
  }
};

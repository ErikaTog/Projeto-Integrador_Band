'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'tecnico', [
        {
          id_tecnico: 1,
          habilidade_tecnica: 'Equipamentos de som'
        },
        {
          id_tecnico: 2,
          habilidade_tecnica: 'Iluminação de palco'
        },
        {
          id_tecnico: 3,
          habilidade_tecnica: 'Gravação'
        },
        {
          id_tecnico: 4,
          habilidade_tecnica: 'Edição de vídeo'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tecnico', null, {});
  }
};

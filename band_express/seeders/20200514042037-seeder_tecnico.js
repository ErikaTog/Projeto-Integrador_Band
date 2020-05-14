'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'tecnico', [
        {
          habilidade_tecnica: 'Equipamentos de som'
        },
        {
          habilidade_tecnica: 'Iluminação de palco'
        },
        {
          habilidade_tecnica: 'Gravação'
        },
        {
          habilidade_tecnica: 'Edição de vídeo'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tecnico', null, {});
  }
};

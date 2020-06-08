'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'vagas', [
        {
          titulo: 'Titulo Vaga 01',
          descricao: 'Descrição 01 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          tipo_vaga: 'Banda',
          id_usuario: 1
        },
        {
          titulo: 'Titulo Vaga 02',
          descricao: 'Descrição 02 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Olímpia',
          estado_vaga: 'SP',
          tipo_vaga: 'Professor',
          id_usuario: 2
        },
        {
          titulo: 'Titulo Vaga 03',
          descricao: 'Descrição 03 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Carapcuíba',
          estado_vaga: 'SP',
          tipo_vaga: 'Estabecimento',
          id_usuario: 3
        },
        {
          titulo: 'Titulo Vaga 04',
          descricao: 'Descrição 04 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Florianópolis',
          estado_vaga: 'SC',
          tipo_vaga: 'Banda',
          id_usuario: 4
        },
        {
          titulo: 'Titulo Vaga 05',
          descricao: 'Descrição 05 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Buritis',
          estado_vaga: 'RO',
          tipo_vaga: 'Professor',
          id_usuario: 5
        },
        {
          titulo: 'Titulo Vaga 06',
          descricao: 'Descrição 06 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'São Valentim',
          estado_vaga: 'RS',
          tipo_vaga: 'Estabecimento',
          id_usuario: 6
        },
        {
          titulo: 'Titulo Vaga 07',
          descricao: 'Descrição 07 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Prata do Piauí',
          estado_vaga: 'PI',
          tipo_vaga: 'Banda',
          id_usuario: 7
        },
        {
          titulo: 'Titulo Vaga 08',
          descricao: 'Descrição 08 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Salinópolis',
          estado_vaga: 'PA',
          tipo_vaga: 'Professor',
          id_usuario: 8
        },
        {
          titulo: 'Titulo Vaga 09',
          descricao: 'Descrição 09 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Rio Negro',
          estado_vaga: 'MS',
          tipo_vaga: 'Estabecimento',
          id_usuario: 9
        },
        {
          titulo: 'Titulo Vaga 10',
          descricao: 'Descrição 10 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper malesuada.',
          cidade_vaga: 'Milagres',
          estado_vaga: 'BA',
          tipo_vaga: 'Banda',
          id_usuario: 1
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vagas', null, {});
  }
};

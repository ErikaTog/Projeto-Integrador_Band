'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'vagas', [
        {
          titulo: 'Professor de Baixo e Violão',
          descricao: 'Professor de Baixo que também de aulas de violão. Disponibilidade 18 as 21 hrs na sexta-feira. Procuramos professores que tenham fácil acesso ao metrô.',
          cidade_vaga: 'Osasco',
          estado_vaga: 'SP',
          tipo_vaga: 'Professor',
          id_usuario: 1
        },
        {
          titulo: 'Procura-se Baterista',
          descricao: 'Procuramos pessoas afim de trabalhar de maneira profissional com repertorio próprio. Disponibilidade para tocar em casas de shows e restaurantes aos finais de semana.',
          cidade_vaga: 'Olímpia',
          estado_vaga: 'SP',
          tipo_vaga: 'Banda',
          id_usuario: 2
        },
        {
          titulo: 'Vaga de DJ',
          descricao: 'Atuar com música, produção, efeitos, discotecagem, sonorização, criação. Animar a pista de dança, performar, agitar a galera e apresentar as atrações.',
          cidade_vaga: 'Carapicuíba',
          estado_vaga: 'SP',
          tipo_vaga: 'Estabecimento',
          id_usuario: 3
        },
        {
          titulo: 'Baixista',
          descricao: 'Baixista procura banda de sertanejo,fixo ou freelancer, todos os ritmos, experiencia e comprometimento.',
          cidade_vaga: 'Florianópolis',
          estado_vaga: 'SC',
          tipo_vaga: 'Banda',
          id_usuario: 4
        },
        {
          titulo: 'Professor de Música',
          descricao: 'Lecionar aulas de música para alunos do Ensino Fundamental. Desejável experiência na área com adolescentes.',
          cidade_vaga: 'Buritis',
          estado_vaga: 'RO',
          tipo_vaga: 'Professor',
          id_usuario: 5
        },
        {
          titulo: 'Ajudante de estúdio de gravação',
          descricao: 'Criar e produzir material musical. Estudar, planejar e executar novas soluções para a formatação de músicas. Manusear equipamentos de estúdio de gravação.',
          cidade_vaga: 'São Valentim',
          estado_vaga: 'RS',
          tipo_vaga: 'Estabecimento',
          id_usuario: 6
        },
        {
          titulo: 'Procura-se vocalista',
          descricao: 'Estamos a procura de um vocal poderoso que esteja na mesma sintonia, buscando profissionalismo sem perder a essência Rock n’ Roll. Visamos alcançar notoriedade com nossos trabalhos.',
          cidade_vaga: 'Prata do Piauí',
          estado_vaga: 'PI',
          tipo_vaga: 'Banda',
          id_usuario: 7
        },
        {
          titulo: 'Vaga de Professor De Guitarra',
          descricao: 'Salário a combinar. Período Integral. Será responsável por ministrar e preparar o material didático das aulas.',
          cidade_vaga: 'Salinópolis',
          estado_vaga: 'PA',
          tipo_vaga: 'Professor',
          id_usuario: 8
        },
        {
          titulo: 'Técnico de palco',
          descricao: 'Manusear equipamentos de som e iluminação. Ser disposto, extrovertido, animado, divertido e pró ativo.',
          cidade_vaga: 'Rio Negro',
          estado_vaga: 'MS',
          tipo_vaga: 'Estabecimento',
          id_usuario: 9
        },
        {
          titulo: 'Backing vocal',
          descricao: 'Procuro banda para fazer vocal ou backing vocal. Sou músico, tecladista, violonista, vocalista e backing vocal.',
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'post', [
        {
          id_usuario: 5,
          texto: "Gostei muito do clipe desse meu novo trabalho. Confiram:",
          video_link: "https://www.youtube.com/embed/iBWeRK-j0Hw",
          data_post: "2020-03-01 18:32:17",
          curtido: 4
        },
        {
          id_usuario: 3,
          texto: "Hoje, às 18, faremos uma transmissão do ensaio da banda Os Farofeiros em um de nossos estúdios.",
          imagem: "/img/teste/usuario_jim.jpeg",
          data_post: "2020-05-03 17:20:17",
          curtido: 2
        },
        {
          id_usuario: 5,
          texto: "Nova música gravada...",
          video_arquivo: "/video/Bread & Wine.webm",
          data_post: "2020-06-03 17:20:17",
          curtido: 3
        },
        {
          id_usuario: 3,
          texto: "Estamos seguindo a recomendação da OMS e não temos previsão da volta do funcionamento. Continue ligado que qualquer mudança iremos informar por aqui o/",
          data_post: "2020-06-09 17:20:17",
          curtido: 3
        }
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
    }
};

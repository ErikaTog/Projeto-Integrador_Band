'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'post', [
        {
          id_usuario: 5,
          texto: "Gostei muito do clipe desse meu novo trabalho. Confiram:",
          imagem: null,
          video: "https://www.youtube.com/watch?v=iBWeRK-j0Hw&list=RDEMUyHDsjme-VYpBUNBHcg1SA",
          curtido: 1
        },
        {
          id_usuario: 3,
          texto: "Hoje, às 18, faremos uma transmissão do ensaio da banda Os Farofeiros em um de nossos estúdios.",
          imagem: "/img/teste/usuario_jim.jpeg",
          video: null,
          curtido: 0
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
    }
};

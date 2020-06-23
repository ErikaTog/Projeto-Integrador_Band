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
        },
        {
          id_usuario: 3,
          texto: "Hoje, às 18, faremos uma transmissão do ensaio da banda Os Farofeiros em um de nossos estúdios.",
          imagem: "/img/teste/usuario_jim.jpeg",
          data_post: "2020-05-03 17:20:17",
        },
        {
          id_usuario: 5,
          texto: "Nova música gravada...",
          video_arquivo: "/video/Bread & Wine.webm",
          data_post: "2020-06-03 17:20:17",
        },
        {
          id_usuario: 3,
          texto: "Estamos seguindo a recomendação da OMS e não temos previsão da volta do funcionamento. Continue ligado que qualquer mudança iremos informar por aqui o/",
          data_post: "2020-06-09 17:20:17",
        },
        {
          id_usuario: 5,
          texto: "Confiram o meu novo cover: Have you ever seen the rain - Creedence Clearwater Revival",
          video_link: "https://www.youtube.com/embed/gKs3K5mjVcM",
          data_post: "2020-06-12 12:47:58",
        },
        {
          id_usuario: 13,
          texto: "Meu novo trabalho realizado em parceria com a TRIBO: METALLICA - Nothing Else Matters (cover). Não deixem de curtir!!",
          video_link: "https://www.youtube.com/embed/5_e-Hvg57cA",
          data_post: "2020-06-15 12:57:23",
        },
        {
          id_usuario: 15,
          texto: "Confiram o meu novo cover: Have you ever seen the rain - Creedence Clearwater RevivalGrace Vanderwaal 'I Don't Know My Name' - Allie Sherlock cover. Curtam o som 🎶",
          video_link: "https://www.youtube.com/embed/Jho8CNElZfc",
          data_post: "2020-06-17 12:52:19",
        },
        {
          id_usuario: 13,
          texto: "Gostei muito do resultado desse clipe 🔥 Sweet Child O' Mine - Guns n’ Roses (Cover by First To Eleven)",
          video_link: "https://www.youtube.com/embed/J61mtatKT1I",
          data_post: "2020-06-18 12:59:27",
        },
        {
          id_usuario: 6,
          texto: "Confiram parte de nossa apresentação desse fim de semana no Andressa Pub!",
          video_link: "https://www.youtube.com/embed/9xBOA9gTpvw",
          data_post: "2020-06-23 00:02:01",
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
    }
};

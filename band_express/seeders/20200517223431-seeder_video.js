'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'video', [
        {
          tipo: "link",
          titulo: "Amazing Grace",
          caminho: "https://www.youtube.com/watch?v=aaKf6P2nhKg",
          id_usuario: 1,
        },
        {
          tipo: "link", 
          titulo: "美波 | Chorando pela chuva",
          caminho: "https://www.youtube.com/watch?v=0YF8vecQWYs&list=RDT3bxbVGWy5k&index=29",
          id_usuario: 2,
        },
        {
          tipo: "link", 
          titulo: "Send My Love ",
          caminho: "https://www.youtube.com/watch?v=fk4BbF7B29w",
          id_usuario: 4,
        },
        {
          tipo: "link", 
          titulo: "Flood Water",
          caminho: "https://www.youtube.com/watch?v=V1wTQVxYBJg",
          id_usuario: 5,
        },
        {
          tipo: "arquivo", 
          titulo: "Bread & Wine",
          caminho: "/video/Bread & Wine.webm",
          id_usuario: 5,
        },
        {
          tipo: "link", 
          titulo: "Let Your Hair Down" ,
          caminho:"https://www.youtube.com/watch?v=x5YP_oLcgpg",
          id_usuario: 6,
        },
        {
          tipo: "link", 
          titulo: "All About That Bass",
          caminho: "https://www.youtube.com/watch?v=aLnZ1NQm2uk",
          id_usuario: 8,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('video', null, {});
  }
};

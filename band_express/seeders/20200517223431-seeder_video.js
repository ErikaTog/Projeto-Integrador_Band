'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'video', [
        {
          tipo: "link",
          titulo: "Amazing Grace",
          caminho: "https://www.youtube.com/embed/aaKf6P2nhKg",
          id_usuario: 1,
        },
        {
          tipo: "link", 
          titulo: "美波 | Chorando pela chuva",
          caminho: "https://www.youtube.com/embed/0YF8vecQWYs&list=RDT3bxbVGWy5k&index=29",
          id_usuario: 2,
        },
        {
          tipo: "link", 
          titulo: "Send My Love ",
          caminho: "https://www.youtube.com/embed/fk4BbF7B29w",
          id_usuario: 4,
        },
        {
          tipo: "link", 
          titulo: "Flood Water",
          caminho: "https://www.youtube.com/embed/V1wTQVxYBJg",
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
          caminho:"https://www.youtube.com/embed/x5YP_oLcgpg",
          id_usuario: 6,
        },
        {
          tipo: "link", 
          titulo: "Rude",
          caminho:"https://www.youtube.com/embed/PIh2xe4jnpk",
          id_usuario: 6,
        },
        {
          tipo: "link", 
          titulo: "No Regrets",
          caminho:"https://www.youtube.com/embed/_UAh245xaac",
          id_usuario: 6,
        },
        {
          tipo: "link", 
          titulo: "All About That Bass",
          caminho: "https://www.youtube.com/embed/aLnZ1NQm2uk",
          id_usuario: 8,
        },
        {
          tipo: "link",
          titulo: "METALLICA - Nothing Else Matters (cover by TRIBO)",
          caminho: "https://www.youtube.com/embed/5_e-Hvg57cA",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "'Fix You' - Coldplay (Alex Goot, Adyla, Jade Pettyjohn)",
          caminho: "https://www.youtube.com/embed/xrfyzkUc5fA",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "NANDO REIS - All Star (cover by TRIBO)",
          caminho: "https://www.youtube.com/embed/Qj_gDJzyOHU",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "AEROSMITH - Dream On (cover by TRIBO)",
          caminho: "https://www.youtube.com/embed/dI-6o63Nfhw",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "BRYAN ADAMS - Heaven (cover by TRIBO)",
          caminho: "https://www.youtube.com/embed/XQwbzf4igNw",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "'The Scientist' - Coldplay [Alex Goot & Adyla]",
          caminho: "https://www.youtube.com/embed/TalgHWd550w",
          id_usuario: 13,
        },
        {
          tipo: "link",
          titulo: "The Scientist",
          caminho: "https://www.youtube.com/embed/cd9xlYgqwBw",
          id_usuario: 23,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('video', null, {});
  }
};

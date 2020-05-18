'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'audio', [
        {
          tipo: "link",
          titulo: "I Say A Little Prayer",
          caminho: "https://soundcloud.com/stephan7stephan/aretha-franklin-i-say-a-little",
          id_usuario: 1,
        },
        {
          tipo: "link", 
          titulo: "Secret Base (Kimi ga Kureta Mono)",
          caminho: "https://soundcloud.com/rmadillah/ano-hana-secret-base-kimi-ga",
          id_usuario: 2,
        },
        {
          tipo: "link", 
          titulo: "One and Only",
          caminho: "https://soundcloud.com/no-or-862117602/adele-one-and-only",
          id_usuario: 4,
        },
        {
          tipo: "arquivo", 
          titulo: "The Children's Song" ,
          caminho: "/video/The Children's Song.mp3",
          id_usuario: 5,
        },
        {
          tipo: "arquivo", 
          titulo: "Rude" ,
          caminho:"/video/Rude.mp3",
          id_usuario: 6,
        },
        {
          tipo: "link", 
          titulo: "Seven Nation Army - Vintage",
          caminho: "https://soundcloud.com/erayhalisdemir/seven-nation-army-vintage-new-orleans-dirge-white-stripes-cover-ft-haley-reinhart",
          id_usuario: 8,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('audio', null, {});
  }
};
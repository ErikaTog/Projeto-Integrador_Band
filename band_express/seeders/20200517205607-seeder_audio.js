'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'audio', [
        {
          tipo: "arquivo", 
          titulo: "The Children's Song" ,
          caminho: "/audio/The Children's Song.mp3",
          id_usuario: 5,
        },
        {
          tipo: "arquivo", 
          titulo: "Rude" ,
          caminho:"/audio/Rude.mp3",
          id_usuario: 6,
        },       
        {
          tipo: "arquivo", 
          titulo: "Master of Tides - Lindsey Stirling" ,
          caminho:"/audio/audio13-1592853450456.mp3",
          id_usuario: 13,
        },
        {
          tipo: "arquivo", 
          titulo: "Roundtable Rival - Lindsey Stirling" ,
          caminho:"/audio/audio13-1592853473084.mp3",
          id_usuario: 13,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('audio', null, {});
  }
};
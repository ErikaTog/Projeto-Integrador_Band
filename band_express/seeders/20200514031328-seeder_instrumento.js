'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'instrumento', [
        {
          instrumento: 'adufe'
        },
        {
          instrumento: 'afoxé'
        },
        {
          instrumento: 'agogô'
        },
        {
          instrumento: 'atabaque'
        },
        {
          instrumento: 'batá'
        },
        {
          instrumento: 'bateria'
        },
        {
          instrumento: 'bloco sonoro'
        },
        {
          instrumento: 'bombo'
        },
        {
          instrumento: 'bongô'
        },
        {
          instrumento: 'caixa surdo'
        },
        {
          instrumento: 'carrilhão'
        },
        {
          instrumento: 'castanhola'
        },
        {
          instrumento: 'caxixi'
        },
        {
          instrumento: 'ceramofone'
        },
        {
          instrumento: 'chocalho'
        },
        {
          instrumento: 'conga'
        },
        {
          instrumento: 'cuíca'
        },
        {
          instrumento: 'ganzá'
        },
        {
          instrumento: 'gongo'
        },
        {
          instrumento: 'marimba'
        },
        {
          instrumento: 'metalofone'
        },
        {
          instrumento: 'pandeireta'
        },
        {
          instrumento: 'pandeiro'
        },
        {
          instrumento: 'pratos'
        },
        {
          instrumento: 'reco-reco'
        },
        {
          instrumento: 'repinique'
        },
        {
          instrumento: 'sino'
        },
        {
          instrumento: 'tambor'
        },
        {
          instrumento: 'tamborim'
        },
        {
          instrumento: 'tantã'
        },
        {
          instrumento: 'tímpano'
        },
        {
          instrumento: 'triângulo'
        },
        {
          instrumento: 'vibrafone'
        },
        {
          instrumento: 'xequerê'
        },
        {
          instrumento: 'xilofone'
        },
        {
          instrumento: 'clarinete'
        },
        {
          instrumento: 'clarone'
        },
        {
          instrumento: 'contrafagote'
        },
        {
          instrumento: 'corne'
        },
        {
          instrumento: 'didjeridu'
        },
        {
          instrumento: 'fagote'
        },
        {
          instrumento: 'flauta'
        },
        {
          instrumento: 'flautim'
        },
        {
          instrumento: 'gaita'
        },
        {
          instrumento: 'gaita de foles'
        },
        {
          instrumento: 'harmônica'
        },
        {
          instrumento: 'oboé'
        },
        {
          instrumento: 'requinta'
        },
        {
          instrumento: 'saxofone'
        },
        {
          instrumento: 'bombardino'
        },
        {
          instrumento: 'clarim'
        },
        {
          instrumento: 'corneta'
        },
        {
          instrumento: 'fliscorne'
        },
        {
          instrumento: 'trombone'
        },
        {
          instrumento: 'trompa'
        },
        {
          instrumento: 'trompete'
        },
        {
          instrumento: 'tuba'
        },
        {
          instrumento: 'alaúde'
        },
        {
          instrumento: 'baixo'
        },
        {
          instrumento: 'balalaica'
        },
        {
          instrumento: 'bandola'
        },
        {
          instrumento: 'bandolim'
        },
        {
          instrumento: 'banjo'
        },
        {
          instrumento: 'berimbau'
        },
        {
          instrumento: 'cavaquinho'
        },
        {
          instrumento: 'charango'
        },
        {
          instrumento: 'cítara'
        },
        {
          instrumento: 'contrabaixo'
        },
        {
          instrumento: 'cordofone'
        },
        {
          instrumento: 'guitarra'
        },
        {
          instrumento: 'harpa'
        },
        {
          instrumento: 'rabeca'
        },
        {
          instrumento: 'ukulele'
        },
        {
          instrumento: 'viola'
        },
        {
          instrumento: 'violão'
        },
        {
          instrumento: 'violino'
        },
        {
          instrumento: 'violoncelo'
        },
        {
          instrumento: 'acordeão'
        },
        {
          instrumento: 'clavicórdio'
        },
        {
          instrumento: 'concertina'
        },
        {
          instrumento: 'cravo'
        },
        {
          instrumento: 'espineta'
        },
        {
          instrumento: 'órgão'
        },
        {
          instrumento: 'piano'
        },
        {
          instrumento: 'sintetizador'
        },
        {
          instrumento: 'teclado'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('instrumento', null, {});
  }
};
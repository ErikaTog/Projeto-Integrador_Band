'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'usuario', [
        {
          nome: 'Erika',
          email: 'kinha@gmail.com',
          senha: bcrypt.hashSync('123456', 10),
          data_cadastro: new Date(),
          id_estado: 26,
          id_cidade: 5284,
          admin: 1,
          id_tipos_perfil: 2,
        },
        {
          nome: 'Patricia',
          email: 'paty@gmail.com',
          senha: bcrypt.hashSync('123456', 10),
          data_cadastro: new Date(),
          id_estado: 26,
          id_cidade: 5023,
          admin: 0,
          id_tipos_perfil: 1,
        },
        {
          nome: 'Andressa',
          email: 'andy@gmail.com',
          senha: bcrypt.hashSync('123456', 10),
          data_cadastro: new Date(),
          id_estado: 26,
          id_cidade: 5265,
          admin: 0,
          id_tipos_perfil: 3,
        },
        {
          nome: 'Jane Doe',
          email: 'jane@yahoo.com',
          senha: bcrypt.hashSync('987654', 10),
          data_cadastro: new Date(),
          id_estado: 20,
          id_cidade: 3680,
          admin: 0,
          id_tipos_perfil: 1,
        },
        {
          nome: 'John Doe',
          email: 'john@outlook.com',
          senha: bcrypt.hashSync('987654', 10),
          data_cadastro: new Date(),
          id_estado: 15,
          id_cidade: 2558,
          admin: 0,
          id_tipos_perfil: 1,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};

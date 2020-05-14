'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'musico', [
        {
          sexo: 'F',
          email: 'kinha@gmail.com',
          senha: bcrypt.hashSync('123456', 10),
          data_cadastro: new Date(),
          id_estado: 26,
          id_cidade: 5284,
          admin: 1,
          id_tipos_perfil: 2,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musico', null, {});
  }
};

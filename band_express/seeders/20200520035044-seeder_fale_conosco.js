'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'fale_conosco', [
        {
          nome: 'Erika',
          email: 'kinha@gmail.com',
          assunto: 'Bug',
          mensagem: 'Não consigo fazer o login, como devo proceder?'
        },
        {
          nome: 'Patricia',
          email: 'paty@gmail.com',
          assunto: '404',
          mensagem: 'Após o login aparece uma pagina de erro 404, faz 3 dias q não consigo acessar minha página...'
        },
        {
          nome: 'Luna',
          email: 'luna@gmail.com',
          assunto: 'Elogio',
          mensagem: 'Só queria dizer que adoro o site Band+, utilizo ele todos os dias!'
        },
        {
          nome: 'Marcos Alves',
          email: 'marcos_alves@hotmail.com',
          assunto: 'Minhas vagas',
          mensagem: 'Quando tento salvar uma nova vaga ocorre um erro e os dados não são gravados'
        },
        {
          nome: 'Luffy',
          email: 'luffy@mail.com',
          assunto: 'Foto',
          mensagem: 'Não consigo mudar a minha foto de perfil... isso pode ser problema no site?'
        },
        {
          nome: 'Asta',
          email: 'asta@mail.com',
          assunto: 'Cadastro',
          mensagem: 'O q devo fazer quando ocorre um erro no campo de email ao fazer o cadastro musico?'
        },
        {
          nome: 'Jane',
          email: 'jane@doe.com',
          assunto: 'Emprego',
          mensagem: 'Boa Tarde! Eu adoro o site Band+ e estou fazendo um curso de programação e gostaria de saber como posso mandar meu curriculo para o Band+? Att.'
        },
        {
          nome: 'Melissa',
          email: 'melissa2020@mail.com',
          assunto: 'App',
          mensagem: 'Adoro o site Band+! Quando vai sair o app pra baixar no cellular?'
        },
        {
          nome: 'Elsa',
          email: 'elsa@mail.com',
          assunto: 'Conta invadida',
          mensagem: 'Acho que minha conta foi invadida, o que devo fazer'
        },
        {
          nome: 'Carlos Daniel',
          email: 'carlos_daniel@mail.com',
          assunto: 'Varios cadastros',
          mensagem: 'Faço parte de duas bandas, eu consigo cadastrar as duas no mesmo login?'
        }         
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fale_conosco', null, {});
  }
};

const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const { Usuario } = require('../models');
const cadastroEstabController = require('../controllers/CadastroEstabController');
const estabMiddleware = require('../middlewares/cadastroEstab');

router.get('/', cadastroEstabController.formEstab);

router.post('/', [

    //validando o campo nome
    check("nome").trim()
        .not().isEmpty().withMessage('Queremos ajudar a divulgar o seu estabelecimento. Para isso, precisamos que nos diga o nome dele!')
        .isLength({ min: 2, max:100 }).withMessage('O nome do seu estabelecimento não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),
    body('nome').trim()
        .custom(async value => {
            let userCheck = await Usuario.findOne( { where: {nome: value} } );
            if (userCheck) {
                console.log('User Exists');
                return Promise.reject('Os estabelecimentos cadastrados no Band+ são únicos e o seu também será. Então, por favor, nos indique outro nome!');
            }
        }),
    
    //validando o campo senha
    check("senha").trim()
        .not().isEmpty().withMessage('Seu acesso é exclusivo e para isso é necessário que digite uma senha!') // Se espaços
        .isLength({ min: 6, max:16 }).withMessage('Sua senha deve ter entre 6 e 16 caracteres.'),

    //validando o campo email
    check("email").trim() 
        .not().isEmpty().withMessage('Hey, queremos nos comunicar com você! Diga o seu e-mail para nós!'),
        // .isEmail().withMessage('Ops, você não digitou o email corretamente!'), // já está sendo validade pelo html
    body('email').trim()
        .custom(async value => {
            let emailCheck = await Usuario.findOne( { where: {email: value} } );
            if (emailCheck) {
                console.log('Email Exists');
                return Promise.reject('Esse e-mail já foi cadastrado. Precisamos que nos informe outro.');
            }
        }),

     // Validando o campo sobre
     check('sobre').trim()
     .isLength({ max: 2200 }).withMessage('Uhmmm, a sua bio está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

     // Validando o campo sobre
     check('servicos').trim()
     .isLength({ max: 2200 }).withMessage('A descrição dos serviços prestaods no seu estabelecimento está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo Estado
    check('estado').trim()
        .not().isEmpty().withMessage('Queremos que seu estabelecimento seja conhecido na sua região. Por isso, precisamos que nos indique um Estado.'),

     // Validando o campo Cidade
    check('cidade').trim()
        .not().isEmpty().withMessage('Queremos que seu estabelecimento seja conhecido na sua região. Por isso, precisamos que nos indique uma Cidade.'),

    // Validando o campo Site
    check('site').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.'),

     // Validando o campo emailEstab
     check('emailEstab').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o email do seu estabelecimento? Este campo só aceita até 100 caracteres.')

], 

estabMiddleware.error, cadastroEstabController.saveEstab);

module.exports = router;
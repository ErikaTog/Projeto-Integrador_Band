const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');

const { Usuario } = require('../models');

const cadastroMusicoController = require('../controllers/CadastroMusicoController');
const MusicoMiddleware = require('../middlewares/cadastroMusico');

/* cadastro-músico */
router.get('/', cadastroMusicoController.formMusician);
router.post('/',
[   
    // Validando o campo nome
    check('nome').trim()
        .not().isEmpty().withMessage('Queremos ajudar você a ficar famoso. Para isso, precisamos que nos diga o seu nome!')
        .isLength({ min: 2, max: 100 }).withMessage('O seu nome não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),
    body('nome').trim()
        .custom(async value => {
            let userCheck = await Usuario.findOne( { where: {nome: value} } );
            if (userCheck) {
                console.log('User Exists');
                return Promise.reject('Os músicos cadastrados no Band+ são únicos e você também será. Então, por favor, nos indique outro nome!');
            }
        }),
    
    // Validando o campo email
    check('email').trim()
        .not().isEmpty().withMessage('Hey, queremos nos comunicar com você! Diga o seu e-mail para nós!')
        .isEmail().withMessage('Ops, você não digitou o email corretamente!'),
    body('email').trim()
        .custom(async value => {
            let emailCheck = await Usuario.findOne( { where: {email: value} } );
            if (emailCheck) {
                console.log('Email Exists');
                return Promise.reject('Esse e-mail já foi cadastrado. Precisamos que nos informe outro.');
            }
        }),
    
    // Validando o campo senha
    check('senha').trim()
        .not().isEmpty().withMessage('Queremos preservar a sua conta dos invasores. Coloque uma senha!')
        .isLength({ min: 6, max: 16}).withMessage('Para sua maior segurança a senha deve conter entre 6 a 16 caracteres!'),
    
    // Validando o campo sobre
    check('sobre').trim()
        .isLength({ max: 2200 }).withMessage('Uhmmm, a sua bio está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo Estado
    check('estado').trim()
        .not().isEmpty().withMessage('Queremos que você faça sucesso por onde passar, mas precisamos que nos indique um Estado.'),
    
    // Validando o campo Cidade
    check('cidade').trim()
        .not().isEmpty().withMessage('Queremos que você faça sucesso por onde passar, mas precisamos que nos indique uma Cidade.'),
    
    // Validando o campo Site
    check('site').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.'),
    
    // Validando o campo Canal
    check('canal').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu canal? Este campo só aceita até 100 caracteres.')
], 
MusicoMiddleware.error, 
cadastroMusicoController.saveMusician);


module.exports = router;
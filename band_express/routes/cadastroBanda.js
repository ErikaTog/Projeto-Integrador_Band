const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');
const cadastroController = require('../controllers/CadastroBandaController');
// const cadastroBandaMiddleware = require('../middlewares/cadastroBanda');
const { Usuario } = require('../models');

/* GET pre-cadastro. */
router.get('/', cadastroController.pre); 

/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda);

router.post('/banda', [
    //validando o campo nome
    check("nome").trim()
    .not().isEmpty().withMessage('Queremos ajudar a sua banda a ficar famosa. Para isso, precisamos que nos diga o nome dela!')
    .isLength({ min: 2, max:100 }).withMessage('O nome da sua banda não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),
    body('nome').trim()
        .custom(async value => {
            let userCheck = await Usuario.findOne( { where: {nome: value} } );
            if (userCheck) {
                console.log('User Exists');
                return Promise.reject('As bandas cadastradas no Band+ são únicas e a sua também será. Então, por favor, nos indique outro nome!');
            }
        }),

    //validando o campo senha
    check("senha").trim()
    .not().isEmpty().withMessage('Seu acesso é exclusivo e para isso é necessário que digite uma senha!') // Se espaços
    .isLength({ min: 6, max:16 }).withMessage('Sua senha deve ter entre 6 e 16 caracteres.'),

    //validando o campo email
    check("email").trim() 
    .not().isEmpty().withMessage('Hey, queremos nos comunicar com sua banda! Diga o e-mail dela para nós!') // já está sendo validade pelo html
    .isEmail().withMessage('Ops, você não digitou o email corretamente!'), // já está sendo validade pelo html
    body('email').trim()
        .custom(async value => {
            let emailCheck = await Usuario.findOne( { where: {email: value} } );
            if (emailCheck) {
                console.log('Email Exists');
                return Promise.reject('Esse e-mail já foi cadastrado. Precisamos que nos informe outro.');
            }
        }),

    //validando o campo sobre
    check("sobre").trim() 
    .isLength({ max:2200 }).withMessage('Uau, você gosta mesmo de falar sobre a sua banda, porém esse campo só aceita até 2200 caracteres.'),

    //validando o campo integrante
    check("integrante").trim()
    .not().isEmpty().withMessage('Sua banda não pode existir sem nenhum músico. Inclua pelo menos um usuário já cadastrado na rede!')
    .isLength({ min: 2, max:100 }).withMessage('O nome do músico deve ter pelo menos 2 caracteres.'),
    body('integrante').trim()
        .custom(async value => {
            let integranteCheck = await Usuario.findOne( { where: {nome: value} } );
            if (!integranteCheck) {
                console.log('User Exists');
                return Promise.reject('Não acredito, este músico ainda não faz parte do Band+!');
            }
        }),

    //validando o campo função
    check("funcao").trim()
    .not().isEmpty().withMessage('Estamos curiosos para saber qual a função deste integrante. Conte para nós!')
    .isLength({ min: 6, max:100 }).withMessage('A função do integrante deve ter pelo menos 6 caracteres.')
    .isAlpha().withMessage('Use apenas letras para descrever a função do integrante.'),        

], cadastroController.saveBanda);



module.exports = router;
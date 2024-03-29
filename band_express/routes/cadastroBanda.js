const express = require('express');
const router = express.Router();
const {check, body} = require('express-validator');
const {Usuario} = require('../models')
const cadastroBandaController = require('../controllers/CadastroBandaController');                                                    
const bandaMiddleware = require('../middlewares/cadastroBanda');


/* GET/POST cadastro-banda. */
router.get('/', cadastroBandaController.formBanda);

router.post('/', [
    //validando o campo nome
    check("nome").trim()
    .not().isEmpty().withMessage('Queremos ajudar a sua banda a ficar famosa. Para isso, precisamos que nos diga o nome dela!')
    .isLength({ min: 2, max:25 }).withMessage('O nome da sua banda não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres e no máximo 25!'),
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
    .not().isEmpty().withMessage('Queremos preservar a sua conta dos invasores. Coloque uma senha!') // Se espaços
    .isLength({ min: 6, max:16 }).withMessage('Para sua maior segurança a senha deve conter entre 6 a 16 caracteres!'),

    //validando o campo email
    check("email").trim() 
    .not().isEmpty().withMessage('Hey, queremos nos comunicar com sua banda! Diga o e-mail dela para nós!'), // já está sendo validade pelo html. Funciona com espaços
    // .isEmail().withMessage('Ops, você não digitou o email corretamente!'), // já está sendo validade pelo html
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

    //validando o campo estado
    check("estado").trim() 
    .not().isEmpty().withMessage('Queremos que sua banda faça sucesso por onde passar, mas precisamos que nos indique um Estado.'),

    //validando o campo cidade
    check("cidade").trim() 
    .not().isEmpty().withMessage('Queremos que sua banda faça sucesso por onde passar, mas precisamos que nos indique uma Cidade.'),

    // Validando o campo Site
    check('site').trim()
    .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.'),
    
    // Validando o campo Canal
    check('canal').trim()
    .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu canal? Este campo só aceita até 100 caracteres.'),
    
    //validando o campo integrante
    check("integrante").trim()
    .not().isEmpty().withMessage('Sua banda não pode existir sem nenhum músico. Inclua pelo menos um usuário já cadastrado na rede!')
    .isLength({ min: 2, max:25 }).withMessage('O nome do músico deve ter pelo menos 2 caracteres.'),
    body('integrante').trim()
    .custom(async value => {
        let integranteCheck = await Usuario.findOne( { where: {nome: value} } );
        if (!integranteCheck) {
           return Promise.reject('Não acredito, este músico ainda não faz parte do Band+!');
        }
        if (!(integranteCheck.dataValues.id_tipos_perfil == 1)) {
            return Promise.reject('Ops, somente usuários com o perfil Músico podem ser integrantes de uma banda.')
        }
    }),

    //validando o campo função
    check("funcao").trim()
    .not().isEmpty().withMessage('Estamos curiosos para saber qual a função deste integrante. Conte para nós!')
    .isLength({ min: 4, max:100 }).withMessage('A função do integrante deve ter pelo menos 4 caracteres.')
     

], bandaMiddleware.error, cadastroBandaController.saveBanda);

module.exports = router;




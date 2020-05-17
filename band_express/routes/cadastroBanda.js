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
    .not().isEmpty().withMessage('Seu acesso é exclusivo e para isso é necessário que digite uma senha!') // Se digita vazio ou espaços
    .isLength({ min: 6, max:16 }).withMessage('Sua senha deve ter entre 6 e 16 caracteres.')
    

], cadastroController.saveBanda);



module.exports = router;
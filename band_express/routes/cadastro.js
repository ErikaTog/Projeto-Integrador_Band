const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

const cadastroController = require('../controllers/CadastroBandaController');
const cadastroMusicoController = require('../controllers/CadastroMusicoController');
const cadastroEstabController = require('../controllers/CadastroEstabController');


/* GET pre-cadastro. */
router.get('/', cadastroController.pre);

/* GET feed. */
router.get('/feed', cadastroController.irfeed);


/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', cadastroController.saveBanda)

/* cadastro-músico */
router.get('/musico', cadastroMusicoController.formMusician);
router.post('/musico', 
// cadastroMusicoController.validations, cadastroMusicoController.error,

[
    check('nome')
    // .isEmpty().withMessage('Esse campo não pode ser vazio')
    .isLength({ min: 2, max:100 }).withMessage('Esse campo deve ter entre 2 a 100 caracteres'),
    // body('nome')
    // .custom(async value => {
    //     let userCheck = await Usuario.findOne( { where: {nome: value} } );
    //     if (userCheck !== null) {
    //         console.log('User Exists');
    //         return Promise.reject();
    //     }
    // }).withMessage('Este usuário está em uso')
], cadastroMusicoController.error, 
cadastroMusicoController.saveMusician);

/* cadastro-estab */
router.get('/estabelecimento', cadastroEstabController.formEstab);
router.post('/estabelecimento', cadastroEstabController.saveEstab);

module.exports = router;
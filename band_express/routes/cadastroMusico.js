const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');

const { Usuario } = require('../models');

const cadastroMusicoController = require('../controllers/CadastroMusicoController');

// const cadastroMusicoMiddleware = require('../middlewares/cadastroMusico');

/* cadastro-músico */
router.get('/musico', cadastroMusicoController.formMusician);
router.post('/musico', 
// cadastroMusicoController.validations, cadastroMusicoController.error,

[
    check('nome').trim()
        .not().isEmpty().withMessage('Esse campo não pode ser vazio')
        .isLength({ min: 2, max:100 }).withMessage('Esse campo deve ter entre 2 a 100 caracteres'),
    body('nome')
        .custom(async value => {
            let userCheck = await Usuario.findOne( { where: {nome: value} } );
            if (userCheck) {
                console.log('User Exists');
                return Promise.reject('Este usuário está em uso');
            }
        })
], cadastroMusicoController.error, 
cadastroMusicoController.saveMusician);
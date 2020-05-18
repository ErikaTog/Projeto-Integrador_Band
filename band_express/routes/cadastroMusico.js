const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');

const { Usuario } = require('../models');

const cadastroMusicoController = require('../controllers/CadastroMusicoController');

/* cadastro-músico */
router.get('/', cadastroMusicoController.formMusician);
router.post('/',
[
    check('nome').trim()
        .not().isEmpty().withMessage('Esse campo não pode ser vazio')
        .isLength({ min: 2, max:100 }).withMessage('Esse campo deve ter entre 2 a 100 caracteres'),
    body('nome').trim()
        .custom(async value => {
            let userCheck = await Usuario.findOne( { where: {nome: value} } );
            if (userCheck) {
                console.log('User Exists');
                return Promise.reject('Este usuário está em uso');
            }
        })
], 
cadastroMusicoController.error, 
cadastroMusicoController.saveMusician);


module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {check, body} = require('express-validator');

const { Usuario } = require('../models');

const perfilMusicoController = require('../controllers/PerfilMusicoController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const MusicoMiddleware = require('../middlewares/perfilMusico');

router.get('/:id', VerificaUsuarioLogado, perfilMusicoController.show);
router.put('/:id', 
[
    // Validar a senha
    body('senha').trim()
        .custom(async (value, { req }) => {
            let usuario = await Usuario.findOne({ where: {nome: req.session.usuario.nome} })
            if (!bcrypt.compareSync(value, usuario.senha)) {
                return Promise.reject('Para alterar a senha preciso que nos informe a sua senha atual!');
            }
        }),

    // Validar o campo senhaNova
    check('senhaNova').trim()
        .not().isEmpty().withMessage('Ops, sem a senha nova não conseguimos alterar.')
        .isLength({ min: 6, max: 16}).withMessage('Para sua maior segurança a senha deve conter entre 6 a 16 caracteres!'),
    
    // Verificar se a senhaNova == senhaNovaConfirmar
    check('senhaNovaConfirmar').trim()
        .custom((value, { req }) => {
            if (value !== req.body.senhaNova) {
                return Promise.reject('A confirmação da senha nova está incorreta')
            } else {
                return true;
            }
        })
],
MusicoMiddleware.error,
VerificaUsuarioLogado,
perfilMusicoController.changePassword);

module.exports = router;
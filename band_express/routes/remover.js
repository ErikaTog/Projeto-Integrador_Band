const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { body } = require('express-validator');
const removerController = require('../controllers/RemoverController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const ExcluirContaMiddleware = require('../middlewares/excluirConta');

router.get('/', removerController.view);
router.put('/', 
[
    // Validar a senha
    body('senhaExcluir').trim()
        .custom(async (value, { req }) => {
            let usuario = await Usuario.findOne({ where: {id_usuario: req.session.usuario.id_usuario} })
            if (!bcrypt.compareSync(value, usuario.senha)) {
                return Promise.reject('Para excluir sua conta, você precisa digitar a sua senha corretamente!');
            }
        }),
],
VerificaUsuarioLogado,
ExcluirContaMiddleware.error, 
removerController.excluirUsuario);

module.exports = router;
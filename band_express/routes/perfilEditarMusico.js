const express = require('express');
const router = express.Router();
const perfilEditarMusicoController = require('../controllers/PerfilEditarMusicoController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilEditarMusicoController.show);

module.exports = router;
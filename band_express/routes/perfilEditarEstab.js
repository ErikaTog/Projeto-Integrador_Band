const express = require('express');
const router = express.Router();
const perfilEditarEstabController = require('../controllers/PerfilEditarEstabController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilEditarEstabController.show);

module.exports = router;
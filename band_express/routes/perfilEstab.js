const express = require('express');
const router = express.Router();
const perfilEstabController = require('../controllers/PerfilEstabController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilEstabController.show);

module.exports = router;
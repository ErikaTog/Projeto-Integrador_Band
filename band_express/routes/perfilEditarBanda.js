const express = require('express');
const router = express.Router();
const perfilEditarBandaController = require('../controllers/PerfilEditarBandaController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilEditarBandaController.show);

module.exports = router;
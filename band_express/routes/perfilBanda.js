const express = require('express');
const router = express.Router();
const perfilBandaController = require('../controllers/PerfilBandaController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilBandaController.show);

module.exports = router;
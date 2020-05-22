const express = require('express');
const router = express.Router();
const anuncieController = require('../controllers/anuncieController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, anuncieController.show);

module.exports = router;
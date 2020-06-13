const express = require('express');
const router = express.Router();

const minhaPublicacaoController = require('../controllers/MinhaPublicacao');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, minhaPublicacaoController.view);

module.exports = router;
const express = require('express');
const router = express.Router();
const perfilMusicoController = require('../controllers/PerfilMusicoController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/:id', VerificaUsuarioLogado, perfilMusicoController.show);

module.exports = router;
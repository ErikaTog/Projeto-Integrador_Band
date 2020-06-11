const express = require('express');
const router = express.Router();

const ajudaController = require('../controllers/AjudaController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, ajudaController.view);

module.exports = router;
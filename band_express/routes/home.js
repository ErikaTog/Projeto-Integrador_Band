const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, homeController.view);

module.exports = router;
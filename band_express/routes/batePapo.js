const express = require('express');
const router = express.Router();

const batePapoController = require('../controllers/BatePapoController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, batePapoController.show);

module.exports = router;
const express = require('express');
const router = express.Router();
const vagasController = require('../controllers/VagasController');                                             
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');


/* GET pre-cadastro. */
router.get('/', VerificaUsuarioLogado, vagasController.view); 


module.exports = router;

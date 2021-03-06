const express = require('express');
const router = express.Router();
const vagasController = require('../controllers/VagasController');                                             
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');


/* GET pre-cadastro. */
router.get('/', VerificaUsuarioLogado, vagasController.show);

router.get('/novaVaga', VerificaUsuarioLogado, vagasController.show);
router.post('/novaVaga', VerificaUsuarioLogado, vagasController.novaVaga);

router.post('/dadosBuscar', VerificaUsuarioLogado, vagasController.dadosBuscar);
router.post('/dadosApagar', VerificaUsuarioLogado, vagasController.dadosApagar);
router.post('/dadosEditar', VerificaUsuarioLogado, vagasController.dadosEditar);

module.exports = router;
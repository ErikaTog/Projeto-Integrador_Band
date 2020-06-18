const express = require('express');
const router = express.Router();
const vagasController = require('../controllers/VagasController');                                             
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');


/* GET pre-cadastro. */
router.get('/', VerificaUsuarioLogado, vagasController.show);

router.get('/novaVaga', VerificaUsuarioLogado, vagasController.show);
router.post('/novaVaga', VerificaUsuarioLogado, vagasController.novaVaga);

router.get('/editarVaga', VerificaUsuarioLogado, vagasController.show);
router.put('/editarVaga', VerificaUsuarioLogado, vagasController.editarVaga); 

router.post('/dados', VerificaUsuarioLogado, vagasController.dados);

module.exports = router;
const express = require('express');
const router = express.Router();
const minhaRedeController = require('../controllers/MinhaRedeController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');                                            

/* GET pre-cadastro. */
router.get('/', VerificaUsuarioLogado, minhaRedeController.show); 

router.post('/buscar', VerificaUsuarioLogado, minhaRedeController.buscar); 

module.exports = router;

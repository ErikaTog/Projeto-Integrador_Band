const express = require('express');
const router = express.Router();
const minhaRedeController = require('../controllers/MinhaRedeController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');                                            

/* GET pre-cadastro. */
router.get('/', VerificaUsuarioLogado, minhaRedeController.show); 

// router.post('/', VerificaUsuarioLogado, minhaRedeController.busca); 

module.exports = router;

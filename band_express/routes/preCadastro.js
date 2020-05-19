const express = require('express');
const router = express.Router();
const PreCadastroController = require('../controllers/PreCadastroController');                                             



/* GET pre-cadastro. */
router.get('/', PreCadastroController.view); 


module.exports = router;

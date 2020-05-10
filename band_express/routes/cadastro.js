const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/CadastroController');


/* GET pre-cadastro. */
router.get('/', cadastroController.pre);

/* GET/PoST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)


module.exports = router;
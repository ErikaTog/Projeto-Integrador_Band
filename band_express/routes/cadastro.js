const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/CadastroController');


/* GET pre-cadastro. */
router.get('/', cadastroController.pre);

/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', cadastroController.saveBanda)


module.exports = router;
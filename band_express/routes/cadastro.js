const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/CadastroController');
const cadastroMusicoController = require('../controllers/CadastroMusicoController');


/* GET pre-cadastro. */
router.get('/', cadastroController.pre);

/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', cadastroController.saveBanda)

/* cadastro-músico */
router.get('/musico', cadastroMusicoController.formMusician);
router.post('/musico', cadastroMusicoController.saveMusician);

module.exports = router;
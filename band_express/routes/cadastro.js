const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/CadastroBandaController');
const cadastroMusicoController = require('../controllers/CadastroMusicoController');
const cadastroEstabController = require('../controllers/CadastroEstabController');


/* GET pre-cadastro. */
router.get('/', cadastroController.pre);

/* GET feed. */
router.get('/feed', cadastroController.irfeed);


/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', cadastroController.saveBanda)

/* cadastro-músico */
router.get('/musico', cadastroMusicoController.formMusician);
router.post('/musico', cadastroMusicoController.saveMusician);

/* cadastro-estab */
router.get('/estabelecimento', cadastroEstabController.formEstab);
router.post('/estabelecimento', cadastroEstabController.saveEstab);

module.exports = router;
const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');

const { Usuario } = require('../models')

const cadastroController = require('../controllers/CadastroBandaController');
const cadastroEstabController = require('../controllers/CadastroEstabController');

// const cadastroBandaMiddleware = require('../middlewares/cadastroBanda');
// const cadastroEstabMiddleware = require('../middlewares/cadastroEstabelecimento');
// const cadastroMusicoMiddleware = require('../middlewares/cadastroMusico');

/* GET pre-cadastro. */
router.get('/', cadastroController.pre); 

// /* GET feed. */
// router.get('/feed', cadastroController.irfeed);


/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', [
    check("nome").isEmpty().withMessage('O campo nome não pode ser vazio'),
    check("nome").isLength({ min: 2, max:100 }).withMessage('Sua banda não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!')

], cadastroController.saveBanda);




/* cadastro-estab */
router.get('/estabelecimento', cadastroEstabController.formEstab);
router.post('/estabelecimento', cadastroEstabController.saveEstab);

module.exports = router;
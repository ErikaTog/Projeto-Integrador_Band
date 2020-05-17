const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');
const cadastroController = require('../controllers/CadastroBandaController');
// const cadastroBandaMiddleware = require('../middlewares/cadastroBanda');

/* GET pre-cadastro. */
router.get('/', cadastroController.pre); 

/* GET/POST cadastro-banda. */
router.get('/banda', cadastroController.formBanda)
router.post('/banda', [
    check("nome").trim()
    .not().isEmpty().withMessage('Queremos ajudar a sua banda a ficar famosa. Para isso, precisamos que nos diga o nome dela!')
    .isLength({ min: 2, max:100 }).withMessage('O nome da sua banda não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!') 
], cadastroController.saveBanda);


module.exports = router;
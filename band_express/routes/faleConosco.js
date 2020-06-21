const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const faleConoscoController = require('../controllers/FaleConoscoController')
const FaleConoscoMiddleware = require('../middlewares/faleConosco');

router.get('/', faleConoscoController.view);
router.post('/',
[
    check('nome').trim()
        .not().isEmpty().withMessage('Precisamos que nos diga o seu nome.')
        .isLength({ min: 2, max: 25 }).withMessage('O seu nome não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),

    check('email').trim()
        .not().isEmpty().withMessage('Hey, queremos nos comunicar com você! Diga o seu e-mail para nós!')
        .isEmail().withMessage('Ops, você não digitou o email corretamente!'),

    check('assunto').trim()
        .not().isEmpty().withMessage('Selecione um assunto para resolvermos o seu problema da melhor forma!'),

    check('mensagem').trim()
        .not().isEmpty().withMessage('Escreva uma mensagem para entendermos o seu problema!')
        .isLength({ max: 500 }).withMessage('Uhmmm, a sua mensagem está interessante, porém esse campo só aceita até 500 caracteres.'),
],
FaleConoscoMiddleware.error,
faleConoscoController.saveMsg);

module.exports = router;
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const minhaPublicacaoController = require('../controllers/MinhaPublicacao');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const minhaPublicacaoMiddleware = require('../middlewares/minhaPublicacao');

router.get('/', VerificaUsuarioLogado, minhaPublicacaoController.view);
router.post('/', 
[
    // Validando campo texto
    check('comentario').trim()
        .not().isEmpty().withMessage('O seu comentário está vazio...')
        .isLength({ max: 500 }).withMessage('Uhmmm, o seu comentário está muito interessante, porém esse campo só aceita até 500 caracteres.'),
],
minhaPublicacaoMiddleware.errorComentario,
VerificaUsuarioLogado, minhaPublicacaoController.saveComentario);

// Excluir Post
router.get('/excluirPost/:id', VerificaUsuarioLogado, minhaPublicacaoController.deletePost);

module.exports = router;
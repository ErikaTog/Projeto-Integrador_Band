const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check, body } = require('express-validator');

const homeController = require('../controllers/HomeController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const HomeMiddleware = require('../middlewares/Home');
const MulterPost = require('../middlewares/multerPost');

router.get('/', VerificaUsuarioLogado, homeController.view);
router.post('/', 
[
    // Validando campo texto
    check('comentario').trim()
        .not().isEmpty().withMessage('O seu comentário está vazio...')
        .isLength({ max: 500 }).withMessage('Uhmmm, o seu comentário está muito interessante, porém esse campo só aceita até 500 caracteres.'),
],
HomeMiddleware.errorComentario,
VerificaUsuarioLogado, homeController.saveComentario);

router.get('/publicar', VerificaUsuarioLogado, homeController.view);
router.post('/publicar',
multer(MulterPost).any(),
[
    // Validando campo texto
    check('textoPublicar').trim()
        .not().isEmpty().withMessage('Para realizar uma publicação precisamos que você escreva um texto.')
        .isLength({ max: 2200 }).withMessage('Uhmmm, a sua publicação está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo de vídeo (link)
    body('videoLink').trim()
        .custom(async (value) => {
            if (value) {
                if (!value.includes('youtube.com') && !value.includes('vimeo.com') && !value.includes('dailymotion.com')) {
                    return Promise.reject('Por enquanto só aceitamos link do https://www.youtube.com/, https://vimeo.com/pt-br ou https://www.dailymotion.com/br');
                }
            }
        }),
],
HomeMiddleware.error,
VerificaUsuarioLogado, homeController.savePublicar);

// Button curtir
router.get('/curtir/:id', VerificaUsuarioLogado, homeController.curtir);
router.get('/deixarDeCurtir/:id', VerificaUsuarioLogado, homeController.naoCurtir);

module.exports = router;
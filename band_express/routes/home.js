const express = require('express');
const router = express.Router();
const multer = require('multer');

const homeController = require('../controllers/HomeController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const MulterPost = require('../middlewares/multerPost');

router.get('/', VerificaUsuarioLogado, homeController.view);
router.post('/', VerificaUsuarioLogado, homeController.saveComentario);
router.get('/publicar', VerificaUsuarioLogado, homeController.view);
router.post('/publicar', multer(MulterPost).any(), VerificaUsuarioLogado, homeController.savePublicar);

module.exports = router;
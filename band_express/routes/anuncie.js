const express = require('express');
const router = express.Router();
const anuncieController = require('../controllers/anuncieController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const multer = require('multer');
const MulterImage = require('../middlewares/multerImage');


router.get('/', VerificaUsuarioLogado, anuncieController.show);

router.get('/novoProduto', VerificaUsuarioLogado, anuncieController.show);
router.post('/novoProduto', multer(MulterImage).any(), VerificaUsuarioLogado, anuncieController.novoProduto);

router.post('/dadosBuscar', VerificaUsuarioLogado, anuncieController.dadosBuscar);
router.post('/dadosApagar', VerificaUsuarioLogado, anuncieController.dadosApagar);
router.post('/dadosEditar', VerificaUsuarioLogado, anuncieController.dadosEditar);

module.exports = router;
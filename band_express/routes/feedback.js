const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/FeedbackController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');

router.get('/', VerificaUsuarioLogado, feedbackController.view);

module.exports = router;
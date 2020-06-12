const express = require('express');
const router = express.Router();

const feedbackExcluir = require('../controllers/FeedbackExcluirController');

router.get('/', feedbackExcluir.view);

module.exports = router;
const express = require('express');
const router = express.Router();

const removerController = require('../controllers/RemoverController');

router.get('/', removerController.view);

module.exports = router;
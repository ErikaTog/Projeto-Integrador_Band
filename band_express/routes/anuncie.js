const express = require('express');
const router = express.Router();

const anuncieController = require('../controllers/anuncieController');

router.get('/', anuncieController.show);

module.exports = router;
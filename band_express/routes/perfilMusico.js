const express = require('express');
const router = express.Router();
const perfilMusicoController = require('../controllers/PerfilMusicoController');

router.get('/:id', perfilMusicoController.show);

module.exports = router;
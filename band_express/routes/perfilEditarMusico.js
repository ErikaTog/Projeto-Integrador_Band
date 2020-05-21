const express = require('express');
const router = express.Router();
const perfilEditarMusicoController = require('../controllers/PerfilEditarMusicoController');

router.get('/:id', perfilEditarMusicoController.show);

module.exports = router;
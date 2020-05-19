const express = require('express');
const router = express.Router();
const {check, validationResult, body} = require('express-validator');

const { Usuario } = require('../models');

const cadastroEstabController = require('../controllers/CadastroEstabController');

router.get('/', cadastroEstabController.formEstab);
router.post('/', cadastroEstabController.saveEstab);

module.exports = router;
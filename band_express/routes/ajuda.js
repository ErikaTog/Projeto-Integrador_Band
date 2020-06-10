const express = require('express');
const router = express.Router();

const ajudaController = require('../controllers/AjudaController');

router.get('/', ajudaController.view);

module.exports = router;
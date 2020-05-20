const express = require('express');
const router = express.Router();
const faleConoscoController = require('../controllers/FaleConoscoController')

router.get('/', faleConoscoController.view);

module.exports = router;
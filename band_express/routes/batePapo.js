const express = require('express');
const router = express.Router();

const batePapoController = require('../controllers/BatePapoController');

router.get('/', batePapoController.show);

module.exports = router;
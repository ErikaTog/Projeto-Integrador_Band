const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');

/* GET Home. */
router.get('/', indexController.view);

router.post('/', indexController.loginUsuario);

module.exports = router;
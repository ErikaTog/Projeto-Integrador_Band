const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');

/* GET Home. */
router.get('/', indexController.view);

router.post('/', indexController.loginUsuario);

router.get('/logout', indexController.logoutUsuario);

module.exports = router;
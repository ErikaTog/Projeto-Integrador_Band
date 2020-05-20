const express = require('express');
const router = express.Router();

const indexController = require('../controllers/IndexController');                                             
// const auth = require('../middlewares/auth');

/* GET Home. */
router.get('/', indexController.view);

router.post('/', indexController.loginUsuario);


/* GET home page. */

router.get('/vagas', (req, res, next) => res.render('vagas'));

router.get('/minhaRede', (req, res, next) => res.render('minhaRede'));

router.get('/bate-papo', (req, res, next) => res.render('bate-papo'));

router.get('/anuncie', (req, res, next) => res.render('anuncie'));

router.get('/perfil/1', (req, res, next) => res.render('perfil-musico'));

router.get('/perfil-editar/1', (req, res, next) => res.render('perfil-musico-editar'));

router.get('/perfil/3', (req, res, next) => res.render('perfil-estab'));

router.get('/perfil-editar/3', (req, res, next) => res.render('perfil-estab-editar'));


module.exports = router;

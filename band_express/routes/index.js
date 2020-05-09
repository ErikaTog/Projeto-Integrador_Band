var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });

router.get('/', (req, res, next) => res.render('index'));

router.get('/cadastro/2', (req, res, next) => res.render('form-banda'));

router.get('/feed', (req, res, next) => res.render('feed'));

router.get('/minhaRede', (req, res, next) => res.render('minhaRede'));

router.get('/bate-papo', (req, res, next) => res.render('bate-papo'));

router.get('/anuncie', (req, res, next) => res.render('anuncie'));

router.get('/perfil/1', (req, res, next) => res.render('perfil-musico'));

router.get('/perfil-editar/1', (req, res, next) => res.render('perfil-musico-editar'));

router.get('/perfil/3', (req, res, next) => res.render('perfil-estab'));

router.get('/perfil-editar/3', (req, res, next) => res.render('perfil-estab-editar'));

router.get('/fale-conosco', (req, res, next) => res.render('fale-conosco'));

module.exports = router;

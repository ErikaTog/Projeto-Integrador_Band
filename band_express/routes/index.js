var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/perfil/1', (req, res, next) => res.render('perfil-musico'));

router.get('/perfil-editar/1', (req, res, next) => res.render('perfil-musico-editar'));

router.get('/feed', (req, res, next) => res.render('feed'));


module.exports = router;

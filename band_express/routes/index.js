var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/perfil/1', (req, res, next) => res.render('perfil-musico'));

module.exports = router;

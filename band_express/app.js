var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users'); // não estamos usando 
var indexRouter = require('./routes/index');
var cadastroBandaRouter = require('./routes/cadastroBanda');
var preCadastroRouter = require('./routes/preCadastro')
var cadastroMusicoRouter = require('./routes/cadastroMusico');
var cadastroEstabRouter = require('./routes/cadastroEstab');

var app = express();
const methodOverride = require('method-override');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/users', usersRouter); // não estamos usando 
app.use('/', indexRouter);
app.use('/preCadastro', preCadastroRouter);
app.use('/cadastro/banda', cadastroBandaRouter);
app.use('/cadastro/musico', cadastroMusicoRouter);
app.use('/cadastro/estabelecimento', cadastroEstabRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

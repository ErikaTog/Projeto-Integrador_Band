var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var session = require('express-session')

var indexRouter = require('./routes/index');
var faleConoscoRouter = require('./routes/faleConosco');
var cadastroBandaRouter = require('./routes/cadastroBanda');
var preCadastroRouter = require('./routes/preCadastro');
var cadastroMusicoRouter = require('./routes/cadastroMusico');
var cadastroEstabRouter = require('./routes/cadastroEstab');
var homeRouter = require('./routes/home');
var minhaPublicacaoRouter = require('./routes/minhaPublicacao');
var perfilBandaRouter = require('./routes/perfilBanda');
var perfilEditarBandaRouter = require('./routes/perfilEditarBanda');
var perfilMusicoRouter = require('./routes/perfilMusico');
var perfilEditarMusicoRouter = require('./routes/perfilEditarMusico');
var perfilEstabRouter = require('./routes/perfilEstab');
var perfilEditarEstabRouter = require('./routes/perfilEditarEstab');
var batePapoRouter = require('./routes/batePapo');
var anuncieRouter = require('./routes/anuncie');
var vagasRouter = require('./routes/vagas');
var minhaRedeRouter = require('./routes/minhaRede');
var feedbackRouter = require('./routes/feedback');
var feedbackExcluirRouter = require('./routes/feedbackExcluir');
var ajudaRouter = require('./routes/ajuda');
var removerRouter = require('./routes/remover');
var adminRouter = require('./routes/admin');

var cookieMiddleware = require('./middlewares/cookieLogin');

var app = express();
const methodOverride = require('method-override');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "bandPlusSecretData",
  resave: true,
  saveUninitialized:true
}))
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieMiddleware);


app.use('/', indexRouter);
app.use('/faleConosco', faleConoscoRouter)
app.use('/preCadastro', preCadastroRouter);
app.use('/cadastro/banda', cadastroBandaRouter);
app.use('/cadastro/musico', cadastroMusicoRouter);
app.use('/cadastro/estabelecimento', cadastroEstabRouter);
app.use('/home', homeRouter);
app.use('/minhaPublicacao', minhaPublicacaoRouter);
app.use('/perfil/banda', perfilBandaRouter);
app.use('/perfil/editar/banda', perfilEditarBandaRouter);
app.use('/perfil/musico', perfilMusicoRouter);
app.use('/perfil/editar/musico', perfilEditarMusicoRouter);
app.use('/perfil/estabelecimento', perfilEstabRouter);
app.use('/perfil/editar/estabelecimento', perfilEditarEstabRouter);
app.use('/batePapo', batePapoRouter);
app.use('/anuncie', anuncieRouter);
app.use('/vagas', vagasRouter);
app.use('/minhaRede', minhaRedeRouter);
app.use('/feedback', feedbackRouter);
app.use('/feedbackExcluir', feedbackExcluirRouter);
app.use('/ajuda', ajudaRouter);
app.use('/remover', removerRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('feedbackGeral', { 
    imagem: '/img/feedback_404.svg',
    titulo: 'Pagina não encontrada',
    mensagem: 'Não encontramos essa página, tente mais tarde ou clique em voltar para a pagina inicial.',
    botao: 'Voltar',
    irPara: '/home'
  });
});

// error handler
app.use(function(err, req, res, next) {

  // multer >> limit: fileSize ultrapassar
  if (err.code === 'LIMIT_FILE_SIZE') {
    req.flash('errorImage', `Nós temos limite para armazenar o seu arquivo. Leve em conta o tamanho máximo: \n Imagem: 2MB \n Áudio e Vídeo: 4GB`)
    if(req.session.usuario.id_tipos_perfil == 1) {
      res.redirect('/perfil/editar/musico')
    }
    if(req.session.usuario.id_tipos_perfil == 2) {
      res.redirect('/perfil/editar/banda')
    }
    if(req.session.usuario.id_tipos_perfil == 3) {
      res.redirect('/perfil/editar/estabelecimento')
    }
    return 
  }

  // Handle any other errors

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

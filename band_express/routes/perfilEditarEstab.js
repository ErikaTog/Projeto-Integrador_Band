const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Usuario } = require('../models');
const multer = require('multer');
const path = require('path');

const perfilEditarEstabController = require('../controllers/PerfilEditarEstabController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const EstabMiddleware = require('../middlewares/PerfilEditarEstab');

// Upload de arquivos
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/avatars')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname))
    }
})
   
let upload = multer({ storage: storage })

router.get('/', VerificaUsuarioLogado, perfilEditarEstabController.show);

router.put('/',
[
    // Validando o campo nome
    check('nome').trim()
        .not().isEmpty().withMessage('Queremos ajudar a divulgar o seu estabelecimento. Para isso, precisamos que nos diga o nome dele!')
        .isLength({ min: 2, max: 25 }).withMessage('O nome do seu estabelecimento não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),
    body('nome').trim()
        .custom(async (value, { req }) => {
            let userCheck = await Usuario.findOne({
                where: {
                    nome: value,
                    id_usuario: {
                        [Op.ne]: req.session.usuario.id_usuario
                    }
                }
            });
            if (userCheck) {
                return Promise.reject('Os estabelecimentos cadastrados no Band+ são únicos e você também será. Então, por favor, nos indique outro nome!');
            }
        }),

    // Validando o campo email
    check('email').trim()
        .not().isEmpty().withMessage('Hey, queremos nos comunicar com você! Diga o seu e-mail para nós!')
        .isEmail().withMessage('Ops, você não digitou o email corretamente!'),
    body('email').trim()
        .custom(async (value, { req }) => {
            let emailCheck = await Usuario.findOne({
                where: {
                    email: value,
                    id_usuario: {
                        [Op.ne]: req.session.usuario.id_usuario
                    }
                } 
            });
            if (emailCheck) {
                return Promise.reject('Esse e-mail já foi cadastrado. Precisamos que nos informe outro.');
            }
        }),
    
    // Validando o campo Estado
    check('estado').trim()
        .not().isEmpty().withMessage('Queremos que seu estabelecimento seja conhecido na sua região. Por isso, precisamos que nos indique um Estado.'),
    
    // Validando o campo Cidade
    check('cidade').trim()
        .not().isEmpty().withMessage('Queremos que seu estabelecimento seja conhecido na sua região. Por isso, precisamos que nos indique uma Cidade.'),

    // Validando o campo sobre
    check('sobre').trim()
        .isLength({ max: 2200 }).withMessage('Uhmmm, a sua bio está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo Site
    check('site').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.')
        .isURL().withMessage('Tem certeza que esse é o seu site? Este não parece um endereço válido.'),
],
EstabMiddleware.error, 
VerificaUsuarioLogado,
perfilEditarEstabController.change);

// Modal avatar
router.put('/avatar', upload.any(), perfilEditarEstabController.changeAvatar);
router.put('/wallpaper', upload.any(), perfilEditarEstabController.changeWallpaper);

module.exports = router;
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multer = require('multer');

const { Usuario } = require('../models');

const perfilEditarMusicoController = require('../controllers/PerfilEditarMusicoController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const MusicoMiddleware = require('../middlewares/PerfilEditarMusico');
const MulterAvatar = require('../middlewares/multerAvatar');


router.get('/', VerificaUsuarioLogado, perfilEditarMusicoController.show);

router.put('/',
[
    // Validando o campo nome
    check('nome').trim()
        .not().isEmpty().withMessage('Queremos ajudar você a ficar famoso. Para isso, precisamos que nos diga o seu nome!')
        .isLength({ min: 2, max: 25 }).withMessage('O seu nome não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres!'),
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
                return Promise.reject('Os músicos cadastrados no Band+ são únicos e você também será. Então, por favor, nos indique outro nome!');
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
        .not().isEmpty().withMessage('Queremos que você faça sucesso por onde passar, mas precisamos que nos indique um Estado.'),
    
    // Validando o campo Cidade
    check('cidade').trim()
        .not().isEmpty().withMessage('Queremos que você faça sucesso por onde passar, mas precisamos que nos indique uma Cidade.'),

    // Validando o campo sobre
    check('sobre').trim()
        .isLength({ max: 2200 }).withMessage('Uhmmm, a sua bio está muito interessante, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo Site
    check('site').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.')
        .isURL().withMessage('Tem certeza que esse é o seu site? Este não parece um endereço válido.'),
    
    // Validando o campo Canal
    check('canal').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu canal? Este campo só aceita até 100 caracteres.')
        .isURL().withMessage('Tem certeza que esse é o seu canal? Este não parece um endereço válido.'),
],
MusicoMiddleware.error, VerificaUsuarioLogado, perfilEditarMusicoController.change);

// Modal habilidade
router.get('/skills', VerificaUsuarioLogado, perfilEditarMusicoController.show);
router.post('/skills', 
[
    body('toco')
        .custom(async (value, { req }) => {
            if (value && !req.body.instrumento) {
                return Promise.reject('Para cadastrar o seu talento precisamos que nos informe o intrumento!');
            }
        }),
    body('tecnico')
        .custom(async (value, { req }) => {
            if (value && !req.body.habilidade_tecnica) {
                return Promise.reject('Para cadastrar o seu talento precisamos que nos informe a habilidade técnica!');
            }
        }),
],
MusicoMiddleware.error, VerificaUsuarioLogado, perfilEditarMusicoController.saveSkills);

// Modal avatar
router.get('/avatar', VerificaUsuarioLogado, perfilEditarMusicoController.show);
router.put('/avatar', multer(MulterAvatar).any(), VerificaUsuarioLogado, perfilEditarMusicoController.changeAvatar);

// Modal wallpaper
router.get('/wallpaper', VerificaUsuarioLogado, perfilEditarMusicoController.show);
router.put('/wallpaper', multer(MulterAvatar).any(), VerificaUsuarioLogado, perfilEditarMusicoController.changeWallpaper);

module.exports = router;
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multer = require('multer');

const { Usuario, Banda, BandaIntegrantes } = require('../models');

const perfilEditarBandaController = require('../controllers/PerfilEditarBandaController');

const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const BandaMiddleware = require('../middlewares/PerfilEditarBanda')
const MulterImage = require('../middlewares/multerImage');
const MulterVideo = require('../middlewares/multerVideo');
const MulterAudio = require('../middlewares/multerAudio');


router.get('/', VerificaUsuarioLogado, perfilEditarBandaController.show);

router.put('/', [
    // Validando o campo nome
    check('nome').trim()
        .not().isEmpty().withMessage('Queremos ajudar a sua banda a ficar famosa. Para isso, precisamos que nos diga o nome dela!')
        .isLength({ min: 2, max: 25 }).withMessage('O nome da sua banda não tem somente uma letra, não é mesmo? Escreva, ao menos, 2 caracteres e no máximo 25!'),
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
                return Promise.reject('As bandas cadastradas no Band+ são únicas. Então, por favor, nos indique outro nome!');
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
        .not().isEmpty().withMessage('Queremos que sua banda faça sucesso por onde passar, mas precisamos que nos indique um Estado.'), //ALTERAR ESSA FRASE DEPOIS QUE CONSEGUIRMOS LISTAR AS CIDADES POR ESTADO
    
    // Validando o campo Cidade
    check('cidade').trim()
        .not().isEmpty().withMessage('Queremos que sua banda faça sucesso por onde passar, mas precisamos que nos indique uma Cidade.'), //ALTERAR ESSA FRASE DEPOIS QUE CONSEGUIRMOS LISTAR AS CIDADES POR ESTADO

    // Validando o campo sobre
    check('sobre').trim()
        .isLength({ max: 2200 }).withMessage('Uau, você gosta mesmo de falar sobre a sua banda, porém esse campo só aceita até 2200 caracteres.'),

    // Validando o campo Site
    check('site').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu site? Este campo só aceita até 100 caracteres.')
        .isURL().withMessage('Tem certeza que esse é o seu site? Este não parece um endereço válido.'),
    
    // Validando o campo Canal
    check('canal').trim()
        .isLength({ max: 100 }).withMessage('Tem certeza que esse é o seu canal? Este campo só aceita até 100 caracteres.')
        .isURL().withMessage('Tem certeza que esse é o seu canal? Este não parece um endereço válido.'),

    // validando o campo função       
    body('funcao')
    .custom(async (value, { req }) => {
        for (let i = 0; i < value.length; i++){
            if (!value[i]){
                return Promise.reject('Estamos curiosos para saber qual a função deste integrante. Conte para nós!')
            } 
            if (value[i].trim().length < 4  || value[i].trim().length > 100){
                return Promise.reject('A função do integrante deve ter pelo menos 4 caracteres.')
            }        
        }
    }),

    // Validando o campo de vídeo
    body('videoAdd')
        .custom(async (value, {req}) => {
            if (value) {
                if (!req.body.videoTitulo.trim() || req.body.videoTitulo.trim().length > 255) {
                    return Promise.reject('Opa, não identificamos o nome da sua música! Por favor, conte para nós no campo título.');
                }
                if (!req.body.videoLink.trim()) {
                    return Promise.reject('Sem o link da música não conseguimos inclui-la em seu perfil! Por favor, coloque esta informação no campo link.');
                }
                if (!req.body.videoLink.includes('youtube.com') && !req.body.videoLink.includes('vimeo.com') && !req.body.videoLink.includes('dailymotion.com')) {
                    return Promise.reject('Por enquanto só aceitamos link do https://www.youtube.com/, https://vimeo.com/pt-br ou https://www.dailymotion.com/br');
                }
            }
        })    
], BandaMiddleware.error, VerificaUsuarioLogado, perfilEditarBandaController.change);

// Modal Integrantes
router.get('/integrantes', VerificaUsuarioLogado, perfilEditarBandaController.show);
router.post('/integrantes', 
[
    check("membro").trim()
    .isLength({ min: 2, max:25 }).withMessage('O nome do músico deve ter pelo menos 2 caracteres e no máximo 25.'),
        body('membro').trim()
        .custom(async (value, { req }) => {
            let integranteCheck = await Usuario.findOne( { where: {nome: value} } );
            if (!integranteCheck) {
               return Promise.reject('Não acredito, este músico ainda não faz parte do Band+!');
            }
            if (!(integranteCheck.dataValues.id_tipos_perfil == 1)) {
                return Promise.reject('Ops, somente usuários com o perfil Músico podem ser integrantes de uma banda.');
            }
            let idBanda = await Banda.findOne({
                where: {
                    id_usuario: {
                        [Op.eq]: req.session.usuario.id_usuario
                    }
                }
            });
            
            let integranteCadastrado = await BandaIntegrantes.findOne({
                attributes: ['id_integrante'],
                where:{
                    id_banda: idBanda.id_banda, 
                    id_integrante: integranteCheck.id_usuario
                }
            });
       
            if(integranteCadastrado){
                return Promise.reject(`${value} já está na banda ${req.session.usuario.nome}!`)
            } 

        }),
    
    check("funcao").trim()
    .not().isEmpty().withMessage('Estamos curiosos para saber qual a função deste integrante. Conte para nós!')
    .isLength({ min: 4, max:100 }).withMessage('A função do integrante deve ter pelo menos 4 caracteres.')
        
], BandaMiddleware.error, VerificaUsuarioLogado, perfilEditarBandaController.saveMembers),


// Modal avatar 
router.get('/avatar', VerificaUsuarioLogado, perfilEditarBandaController.show);
router.put('/avatar',  multer(MulterImage).any(), perfilEditarBandaController.changeAvatar), 


// Modal wallpaper 
router.get('/wallpaper', VerificaUsuarioLogado, perfilEditarBandaController.show);
router.put('/wallpaper',  multer(MulterImage).any(), perfilEditarBandaController.changeWallpaper);

// Modal arquivo video
router.get('/video', VerificaUsuarioLogado, perfilEditarBandaController.show);
router.post('/video',  multer(MulterVideo).any(),  VerificaUsuarioLogado, perfilEditarBandaController.saveVideoFile);

// Modal arquivo audio
router.get('/audio', VerificaUsuarioLogado, perfilEditarBandaController.show);
router.post('/audio', multer(MulterAudio).any(), VerificaUsuarioLogado, perfilEditarBandaController.saveAudioFile);


module.exports = router;
       
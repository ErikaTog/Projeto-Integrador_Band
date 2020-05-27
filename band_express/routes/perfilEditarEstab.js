const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Usuario } = require('../models');
const perfilEditarEstabController = require('../controllers/PerfilEditarEstabController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const EstabMiddleware = require('../middlewares/PerfilEditarEstab');

router.get('/:id', VerificaUsuarioLogado, perfilEditarEstabController.show);

router.put('/:id',
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

     // Validando o campo sobre
     check('servicos').trim()
     .isLength({ max: 2200 }).withMessage('A descrição dos serviços prestaods no seu estabelecimento está muito interessante, porém esse campo só aceita até 2200 caracteres.'),
    
],
EstabMiddleware.error, 
perfilEditarEstabController.change);

module.exports = router;
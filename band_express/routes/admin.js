const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const adminController = require('../controllers/AdminController');
const VerificaUsuarioLogado = require('../middlewares/verificaUsuarioLogado');
const VerificaAdmin = require('../middlewares/verificaAdmin');
const AdminMiddleware = require('../middlewares/Admin');

const adminFaleController = require('../controllers/AdminFaleConoscoController');

router.get('/', VerificaUsuarioLogado, VerificaAdmin, adminController.show);
router.put('/', 
[
    // Validar id
    check('id').trim()
    .not().isEmpty().withMessage('Ops, sem o id do usuário não é possível alterar a senha.')
    .isDecimal().withMessage('O campo id do usuário aceita somente números'),
    
    // Validar o campo senhaNova
    check('senhaNova').trim()
    .not().isEmpty().withMessage('Ops, sem a senha nova não conseguimos alterar.')
    .isLength({ min: 6, max: 16}).withMessage('Para a maior segurança do usuário a senha deve conter entre 6 a 16 caracteres!'),
    
    // Verificar se a senhaNova == senhaNovaConfirmar
    check('senhaNovaConfirmar').trim()
    .custom((value, { req }) => {
        if (value !== req.body.senhaNova) {
            return Promise.reject('A confirmação da senha nova está incorreta')
        } else {
            return true;
        }
    })
],
AdminMiddleware.error,
VerificaUsuarioLogado,
VerificaAdmin,
adminController.changePassword);

// Carregar posts
router.get('/carregarUsuario/:page', VerificaUsuarioLogado, adminController.loadUsuario);

// Excluir usuário
router.get('/excluirUsuario/:id', VerificaUsuarioLogado, VerificaAdmin, adminController.deleteUsuario);

/**
 * Fale Conosco
 */

router.get('/faleConosco', VerificaUsuarioLogado, VerificaAdmin, adminFaleController.show);

// Resolvido
router.get('/faleConosco/resolvido/:id', VerificaUsuarioLogado, VerificaAdmin, adminFaleController.saveCheck);

// Excluir
router.get('/faleConosco/excluir/:id', VerificaUsuarioLogado, VerificaAdmin, adminFaleController.deleteMsg);

// Carregar msg
router.get('/faleConosco/carregar/:page', VerificaUsuarioLogado, VerificaAdmin, adminFaleController.loadMsg);

module.exports = router;
const { Usuario } = require('../models'); 

const removerController = {
    view: async (req, res) => {

        return res.render('remover', { 
            title: 'Gerenciar', 
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });
    },

    excluirUsuario: async (req, res) => {

        // let { motivo, senhaExcluir } = req.body;
        const dadosUsuario = await Usuario.destroy({
            where: {
                id_usuario:  req.session.usuario.id_usuario
            }
        });
        
        return res.redirect('/');
        
    },
} 

module.exports = removerController;
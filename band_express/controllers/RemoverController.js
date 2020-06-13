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

        req.session.destroy();

        return res.render('feedbackGeral', { 
            imagem: '/img/feedback_excluir.svg',
            titulo: 'Exclusão feita com sucesso',
            mensagem: 'Sua conta Band + e todos os seus dados foram excluídos do nosso banco de dados.',
            botao: 'Band +'
        });
        
    },
} 

module.exports = removerController;
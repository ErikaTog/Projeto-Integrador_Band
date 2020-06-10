const { Usuario, Minha_rede } = require('../models');

const homeController = {
    view: async (req, res) => {
        
        // Link perfil
        const link = await Usuario.findOne({
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['link_perfil']
        })
        
        // Seguidores e Seguindo
        const seguidores = await Minha_rede.count({ where: { id_usuario: req.session.usuario.id_usuario } });
        const seguindo = await Minha_rede.count({ where: { id_usuario_seguido: req.session.usuario.id_usuario } });

        // Novos usuários >> nome, avatar, link

        // Post ordenados pelos mais recentes

        return res.render('feed', { 
            title: 'Band+', 
            usuario: req.session.usuario,
            link: link.link_perfil,
            seguidores,
            seguindo
        });
    }
} 

module.exports = homeController;
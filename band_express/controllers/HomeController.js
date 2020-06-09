const { Musico, Banda, Estabelecimento } = require('../models');

const homeController = {
    view: async (req, res) => {

        // Avatar
        
        // Seguidores e Seguindo

        // Novos usuários >> nome, avatar, link (por cidade)

        // Post ordenados pelos mais recentes

        return res.render('feed', { title: 'Band+', usuario: req.session.usuario });
    }
} 

module.exports = homeController;
const { Musico } = require('../models');

const homeController = {
    view: async (req, res) => {
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico', 'sobre', 'site', 'canal', 'canto', 'toco', 'tecnico'] 
        });

        return res.render('feed', { title: 'Home', usuario: req.session.usuario, dadosMusico });
    }
} 

module.exports = homeController;
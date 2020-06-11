const { Usuario, Minha_rede } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

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
        const novosUsuarios = await Usuario.findAll({
            where: {
                data_cadastro: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            },
            raw: true,
            attributes: ['nome', 'avatar', 'link_perfil', 'data_cadastro'],
            limit: 10,
            order: [['data_cadastro', 'DESC']]
        })

        // Post ordenados pelos mais recentes 

        return res.render('feed', { 
            title: 'Band+', 
            usuario: req.session.usuario,
            link: link.link_perfil,
            seguidores,
            seguindo,
            novosUsuarios
        });
    }
} 

module.exports = homeController;
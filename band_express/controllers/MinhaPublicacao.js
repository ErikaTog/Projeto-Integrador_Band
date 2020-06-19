const { Usuario, Minha_rede, Post, Comentario, Curtida } = require('../models');
const { Op, Sequelize} = require('sequelize');
const moment = require('moment');

const publicacaoController = {
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
        const posts = await Post.findAll({
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_post', 'texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
            include: [{
                model: Usuario,
                as: 'postUsuario',
                attributes: []
            }],
            limit: 10,
            order: [['data_post', 'DESC']]
        })

        // Buscar os comentários dos posts
        const comentarios  = await Comentario.findAll({
            raw: true,
            attributes: ['id_post', 'comentario', 'comentarioUsuario.nome', 'comentarioUsuario.avatar', 'comentarioUsuario.link_perfil'],
            include: [{
                model: Usuario,
                as: 'comentarioUsuario',
                attributes:[],
                order: [['id_comentario']]
            }],
            order: [['id_post']]
        })

        // Buscar curtidas
        const curtidas = await Post.findAll({
            raw: true,
            attributes: ['id_post', [Sequelize.fn('COUNT', Sequelize.col('postCurtida.id_post')), 'curtidas']],
            include: [{
                model: Curtida,
                as: 'postCurtida',
                attributes: []
            }],
            group: ['id_post']
        })

        return res.render('feed-user', { 
            title: 'Minhas publicações', 
            usuario: req.session.usuario,
            link: link.link_perfil,
            seguidores,
            seguindo,
            novosUsuarios,
            posts,
            comentarios,
            curtidas,
            errors: req.flash('errorValidator'),
        });
    },
    saveComentario: async (req, res) => {
        // console.log(req.body);
        let { comentario, id_post } = req.body;

        // Salvar no BD
        await Comentario.create({
            id_post,
            id_usuario: req.session.usuario.id_usuario,
            comentario,
        })

        res.redirect('/minhaPublicacao');
    },
    deletePost: async (req, res) => {
        await Post.destroy({
            where: { id_post: req.params.id }
        });
    }
} 

module.exports = publicacaoController;
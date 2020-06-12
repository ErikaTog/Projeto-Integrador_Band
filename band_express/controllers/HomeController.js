const { Usuario, Minha_rede, Post, Comentario } = require('../models');
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
        const posts = await Post.findAll({
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
                attributes:[]
            }],
            order: [['id_post']]
        })


        return res.render('feed', { 
            title: 'Band+', 
            usuario: req.session.usuario,
            link: link.link_perfil,
            seguidores,
            seguindo,
            novosUsuarios,
            posts,
            comentarios
        });
    },
    saveComentario: async (req, res) => {
        console.log(req.body);

        res.redirect('/home');
    },
    savePublicar: async (req, res) => {
        // console.log(req.body);
        // console.log(req.files);

        let { textoPublicar: texto } = req.body;
        let caminhoImagem = '';
        let caminhoVideo = '';

        // Verificar se req.files não está vazio
        // verificar fieldname >> imagem ou video
        if (req.files.length) {
            if (req.files[0].fieldname == 'imagem') {
                caminhoImagem = req.files[0].destination.slice(8) + '/' + req.files[0].filename;
            }

            if (req.files[0].fieldname == 'video') {
                caminhoVideo = req.files[0].destination.slice(8) + '/' + req.files[0].filename;
            }
        }

        // Salvar no BD
        await Post.create({
            id_usuario: req.session.usuario.id_usuario,
            texto,
            imagem: caminhoImagem,
            video_arquivo: caminhoVideo,
            data_post: new Date(),
            curtido: 0
        })

        res.redirect('/home');
    }
} 

module.exports = homeController;
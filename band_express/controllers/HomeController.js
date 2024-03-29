const { Usuario, Minha_rede, Post, Comentario, Curtida } = require('../models');
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
            limit: 4,
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
        })

        const listaComentarios = await JSON.stringify(comentarios);

        // Buscar curtidas
        const curtidas = await Curtida.findAll({
            raw: true,
            attributes: ['id_post', 'id_usuario'],
            where: { id_usuario: req.session.usuario.id_usuario },
        })

        return res.render('feed', { 
            title: 'Band+', 
            usuario: req.session.usuario,
            link: link.link_perfil,
            seguidores,
            seguindo,
            novosUsuarios,
            posts,
            comentarios,
            listaComentarios,
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

        res.redirect('/home');
    },
    savePublicar: async (req, res) => {
        // console.log(req.body);
        // console.log(req.files);

        let { textoPublicar, videoLink } = req.body;
        let texto = textoPublicar.trim();
        videoLink = videoLink.trim();
        let caminhoImagem = '';
        let caminhoVideo = '';
        let video_link = '';

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

        // Tratar link de video
        if (videoLink) {

            // YouTube
            if (videoLink.includes('youtube.com')) {
                let urlYoutube = videoLink.split("=");
                video_link = `https://www.youtube.com/embed/${urlYoutube[1]}`
            }

            // Vimeo 
            if (videoLink.includes('vimeo.com')) {
                let urlVimeo = videoLink.split("/");
                video_link = `https://player.vimeo.com/video/${urlVimeo[3]}`
            }

            // Dailymotion
            if (videoLink.includes('dailymotion.com')) {
                let urlDaily = videoLink.split("/");
                video_link = `https://www.dailymotion.com/embed/video/${urlDaily[4]}`
            }
        }


        // Salvar no BD
        await Post.create({
            id_usuario: req.session.usuario.id_usuario,
            texto,
            imagem: caminhoImagem,
            video_arquivo: caminhoVideo,
            video_link,
            data_post: new Date()
        })

        res.redirect('/home');
    },
    naoCurtir: async (req, res) => {
        await Curtida.destroy({
            where: {
                [Op.and]: [
                    { id_post: req.params.id },
                    { id_usuario: req.session.usuario.id_usuario }
                ]
            }
        });

        return;
    },
    curtir: async (req, res) => {
        await Curtida.create({
            id_post: req.params.id,
            id_usuario: req.session.usuario.id_usuario
        });

        return;
    },
    loadPost: async (req, res) => {
        const { page } = req.params;

        const limit = 4;

        const posts = await Post.findAll({
            raw: true,
            attributes: ['id_post', 'texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
            include: [{
                model: Usuario,
                as: 'postUsuario',
                attributes: []
            }],
            offset: (limit * page),
            limit,
            order: [['data_post', 'DESC']]
        })

        return res.send(posts);
    },
} 

module.exports = homeController;
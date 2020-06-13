const { Cidade, Usuario, Musico, Instrumento, Tecnico, Post, Comentario, Curtida, sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const { post } = require('../routes/minhaPublicacao');

const find = async () => {

    // const link = await Usuario.findOne({
    //     where: { id_usuario: 2 },
    //     raw: true,
    //     attributes: ['link_perfil']
    // })

    // console.log(link)

    // const novos = await Usuario.findAll({
    //     where: {
    //         data_cadastro: {
    //             [Op.gte]: moment().subtract(7, 'days').toDate()
    //         }
    //         // id_cidade: 3680
    //     },
    //     raw: true,
    //     attributes: ['nome', 'avatar', 'link_perfil', 'data_cadastro'],
    //     limit: 10,
    //     order: [['data_cadastro', 'DESC']]
    // })

    // console.log(novos);

    // const posts = await Post.findAll({
    //     raw: true,
    //     attributes: ['id_post', 'texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
    //     include: [{
    //         model: Usuario,
    //         as: 'postUsuario',
    //         attributes: []
    //     }],
    //     limit: 10,
    //     order: [['data_post', 'DESC']]
    // })

    // console.log(posts);

    // const comentarios = await Post.findAll({
    //     raw: true,
    //     attributes: ['id_post', 'texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
    //     include: [{
    //         model: Usuario,
    //         as: 'postUsuario',
    //         // attributes: []
    //     }, {
    //         model: Comentario,
    //         as: 'postComentario',
    //         include: [{
    //             model: Usuario,
    //             as: 'comentarioUsuario',
    //         }]
    //         // attributes: []
    //     }],
    //     // limit: 10,
    //     // order: [['data_post', 'DESC']]
    // })

    // console.log(comentarios)

    // const comentarios = await Comentario.findAll({

    // })
    
    // let comentarios  = await Comentario.findAll({
    //     raw: true,
    //     attributes: ['id_post', 'comentario', 'comentarioUsuario.nome', 'comentarioUsuario.avatar', 'comentarioUsuario.link_perfil'],
    //     include: [{
    //         model: Usuario,
    //         as: 'comentarioUsuario',
    //         attributes:[],
    //         order: [['id_comentario']]
    //     }],
    //     order: [['id_post']]
    // })

    // console.log(comentarios);

    // const curtidas = await Curtida.findAll({
    //     raw: true,
    //     attributes: ['id_post', [Sequelize.fn('COUNT', Sequelize.col('id_post')), 'curtidas']],
    //     group: ['id_post']
    // })

    // console.log(curtidas);
    
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

    console.log(curtidas);


    // Buscar curtidas somente dos posts carregados
    // const posts = await Post.findAll({
    //     where: { id_usuario: 2 },
    //     raw: true,
    //     attributes: ['id_post', 'texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
    //     include: [{
    //         model: Usuario,
    //         as: 'postUsuario',
    //         attributes: []
    //     }],
    //     limit: 10,
    //     order: [['data_post', 'DESC']]
    // })

    // // console.log (posts)
    // let id_posts = [];

    // posts.forEach(post => {
    //     id_posts.push(post.id_post)
    // });

    // const curtidas = await Curtida.findAll({
    //     raw: true,
    //     attributes: ['id_post', [Sequelize.fn('COUNT', Sequelize.col('id_post')), 'curtidas']],
    //     group: ['id_post'],
    //     where: {
    //         id_post: {
    //             [Op.or]: id_posts
    //         }
    //     }
    // })

    // console.log(curtidas);


};

find();
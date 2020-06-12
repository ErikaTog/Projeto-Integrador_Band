const { Cidade, Usuario, Musico, Instrumento, Tecnico, Post, Comentario, Curtida } = require('../models');
const { Op } = require('sequelize');
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

    // // console.log(id_posts);

    // let contarCurtida = [];

    // posts.forEach( async post => {
    //     contarCurtida.push( await Curtida.count({
    //         where: {
    //             id_post: post.id_post
    //         }
    //     }))
    // })
    // console.log(contarCurtida);

    
    // let buscaCurtida = await Curtida.findAll({
    //     raw: true,
    //     attributes: ['id_post'],
    //     where: {
    //         id_post: {
    //             [Op.or]: id_posts
    //         }
    //     }
    // })
    
    // console.log(buscaCurtida);

    // let id_post_curtida = [];

    // buscaCurtida.forEach(curtida => {
    //     id_post_curtida.push(curtida.id_post)
    // });

    // // console.log(id_post_curtida);

    // let curtidas = id_post_curtida.reduce(function( object , item ){
    //     console.log(object);
    //     if ( !object[item] ) {
    //        object[item]=1;
    //     } else {
    //        object[item]++;
    //     }
    //     return object; 
    //   },{}) 

    // console.log(curtidas);

    
    // // console.log(Object.keys(curtidas))
    
    // // const busca = await Curtida.findAll({
    // //     raw: true
    // // });

    // // posts.forEach(post => {
    // //     Object.keys(curtidas).forEach(curtida => {
    // //         if (post.id_post == curtida) {

    // //             console.log(`${post.id_post} tem ${curtidas} curtidas`)
    // //         }
    // //     })
    // // });

};

find();
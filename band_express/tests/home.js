const { Cidade, Usuario, Musico, Instrumento, Tecnico, Post } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

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

    const posts = await Post.findAll({
        raw: true,
        attributes: ['texto', 'imagem', 'video_arquivo', 'video_link', 'data_post', 'postUsuario.nome', 'postUsuario.avatar', 'postUsuario.link_perfil'],
        include: [{
            model: Usuario,
            as: 'postUsuario',
            attributes: []
        }],
        limit: 10,
        order: [['data_post', 'DESC']]
    })

    console.log(posts);
};

find();
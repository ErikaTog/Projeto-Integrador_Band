const { Cidade, Estado, Musico, MusicoInstrumentos ,Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video, Usuario } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const path = require('path');

const query = async () => {
    
    // Buscando o id_cidade e id_estado na tabela cidade
    // const findIdCidade = await Cidade.findOne({
    //     where: { nome: 'Mairiporã' },
    //     raw: true,
    //     attributes: ['id_cidade', 'estado.id_estado'],
    //     include: [{
    //         model: Estado, 
    //         as: 'estado',
    //         attributes: [],
    //         where: { uf: 'SP' }
    //     }],
    // });

    // console.log(findIdCidade);

    // const dadosMusico = await Musico.findOne({ 
    //     where: { id_usuario: 10 }, 
    // });

    // console.log(dadosMusico);

    // let userCheck = await Usuario.findOne({
    //     where: {
    //         nome: 'Mitsu325',
    //         id_usuario: {
    //             [Op.ne]: 10
    //         }
    //     },
    // });
    // console.log(userCheck);

    // let userDiferenteId = []
    // userDiferenteId = userCheck.forEach(user => {
    //     // if (user.dataValues.id_usario == 10) {
    //         userDiferenteId.push(user);
    //     // };
    // });
    // console.log(userDiferenteId);

    // let instrumentos = [];
 
    // instrumentos = await Musico.findAll({
    //     where: { id_musico: 1 },
    //     raw: true,
    //     attributes: ['musicos.instrumentos.instrumento'], 
    //     include: [
    //         {
    //             model: MusicoInstrumentos,
    //             as: 'musicos',
    //             attributes: [],
    //             include: [
    //                 {
    //                     model: Instrumento,
    //                     as: 'instrumentos',
    //                     attributes: []
    //                 }
    //             ]
    //         }
    //     ],
    // });

    // console.log(instrumentos);  instrumentos.instrumento

    // Buscar todos os instrumentos
    // const listaInstrumentos = await Instrumento.findAll({ 
    //     raw: true,
    //     attributes: ['instrumento'] 
    // });

    // listaInstrumentos.forEach(item => {
    //     for (const instrumento of instrumentos) {
    //         if (item.instrumento == instrumento.instrumento) {
    //             console.log(instrumento.instrumento);
    //         }
    //     }
    // });

    // console.log(instrumentos);
    
    // console.log(findInstrumentos)

    // Buscar todas as habilidades
    // const findTecnicos = await Tecnico.findAll({ 
    //     raw: true,
    //     attributes: ['habilidade_tecnica'] 
    // });
    
    // console.log(findTecnicos)

    // Buscando o id_instrumento
    // const findIdInstrumento = await Instrumento.findOne({
    //     where: { instrumento: 'violão' },
    //     raw: true,
    //     attributes: ['id_instrumento']
    // });

    // console.log(findIdInstrumento);

    let fileAvatar = "./public/img/avatars/avatar2"
    const extJpg = fs.existsSync(`${fileAvatar}.jpg`) ? ".jpg": false;
    const extPng = fs.existsSync(`${fileAvatar}.png`) ? ".png": false;
    console.log(extJpg);
    console.log(extPng);


    // fileAvatar += ext;
    // console.log(fileAvatar);

    // if (fs.existsSync(`./public/img/avatars/avatar2${ext}`)) {
    //     console.log("Este arquivo existe!")
    //     fs.unlinkSync(`./public/img/avatars/avatar2${ext}`)
    // }
}

query();
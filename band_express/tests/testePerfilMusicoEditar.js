const { Cidade, Estado, Musico, MusicoInstrumentos ,Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video, Usuario } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

    let instrumentos = [];
 
    instrumentos = await Musico.findAll({
        where: { id_musico: 1 },
        raw: true,
        attributes: ['musicos.instrumentos.instrumento'], 
        include: [
            {
                model: MusicoInstrumentos,
                as: 'musicos',
                attributes: [],
                include: [
                    {
                        model: Instrumento,
                        as: 'instrumentos',
                        attributes: []
                    }
                ]
            }
        ],
    });

    console.log(instrumentos);

    // Buscar todos os instrumentos
    const listaInstrumentos = await Instrumento.findAll({ 
        raw: true,
        attributes: ['instrumento'] 
    });

    
    // console.log(findInstrumentos)

    // Buscar todas as habilidades
    const findTecnicos = await Tecnico.findAll({ 
        raw: true,
        attributes: ['habilidade_tecnica'] 
    });
    
    // console.log(findTecnicos)
}

query();
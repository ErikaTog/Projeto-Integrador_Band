const { Cidade, Usuario, Musico, Instrumento, Tecnico} = require('../models');

const find = async () => {

    // buscando o id da Cidade e do Estado na tabela cidade
    const buscaIdCidade = await Cidade.findOne({
        where: {
            nome: "Sorocaba"
        }
    })

    const idCidade = buscaIdCidade.dataValues.id_cidade;
    const idEstado = buscaIdCidade.dataValues.id_estado;

    // inserindo informação na tabela usuario
    const dadosUsuario = await Usuario.create({
        nome: "Músico Funciona",
        email: "funciona@gmail.com",
        senha: "707070",
        data_cadastro: new Date(),
        admin: 0,
        id_cidade: idCidade,
        id_estado: idEstado,
        perfil_id_perfil: 1
    });
    
    const buscaIdUsuario = await Usuario.findOne({
        where: {
            nome: "Banda Funciona"
        }
    })

    const idUsuario = buscaIdUsuario.dataValues.id_usuario;
    
    // inserindo dados complementares na tabela músico
    const dadosMusico = await Musico.create({
        sexo: "F",
        sobre: "minha banda é rockeira!",
        site: "www.bandafunciona.com.br",
        canal: "youtube.com/bandafunciona",
        canto: 1,
        toco: 1,
        tecnico: 1,
        id_usuario: idUsuario
    });

    const buscaIdMusico = await Musico.findOne({
        where: {
            id_usuario: idUsuario
        }
    })
    const idMusico = buscaIdMusico.dataValues.id_musico;
    
    // Conferir se a pessoa toca, caso sim, buscar o id_instrumento  
    if (dadosMusico.dataValues.toco) {
        const buscaIdInstrumento = await Instrumento.findOne({
            where: {
                nome: "piano"
            }
        });
        const idInstrumento = buscaIdInstrumento.dataValues.id_instrumento;

        // inserindo o id do músico e do instrumento na tabela intermediaria
        const resultado4 = await BandaIntegrantes.create({
            id_banda: idBanda,
            id_integrante: idMusico,
            funcao: "guitarrista"
        });
    }
};

find();
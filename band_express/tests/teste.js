const Sequelize = require('sequelize');
const config = require('../config/database');
const {
    Usuario,
    Banda,
    BandaIntegrantes,
    Cidade,
    Estado
} = require('../models')




async function busca() {

    // // buscando o id da Cidade na tabela cidade
    // const buscaIdCidade = await Cidade.findOne({
    //     where: {
    //         cidade: "Sorocaba"
    //     }
    // })

    // const idCidade = buscaIdCidade.dataValues.id_cidade;

    // // buscando o id do Estado na tabela estado
    // const buscaIdEstado = await Estado.findOne({
    //     where: {
    //         estado: "SP"
    //     }
    // })

    // const idEstado = buscaIdEstado.dataValues.id_estado;


    // // inserindo banda nova na tabela usuario  
    // const resultado1 = await Usuario.create({
    //     nome: "Banda Funciona",
    //     email: "funciona@gmail.com",
    //     senha: "707070",
    //     data_cadastro: "2020/05/13 19:50:00",
    //     admin: 0,
    //     id_cidade: idCidade,
    //     id_estado: idEstado,
    //     perfil_id_perfil: 2
    // });

    // const buscaId = await Usuario.findOne({
    //     where: {
    //         nome: "Banda Funciona"
    //     }
    // })

    // const idUsuario = buscaId.dataValues.id_usuario;

    // console.log("idUsuario: ", buscaId.dataValues)

    // // inserindo dados complementares de banda na tabela banda
    // const resultado2 = await Banda.create({
    //     id_usuario: idUsuario,
    //     genero: "rock",
    //     sobre: "minha banda é rockeira!",
    //     estado: "SP",
    //     cidade: "Sorocaba",
    //     site: "www.bandafunciona.com.br",
    //     canal: "youtube.com/bandafunciona",
    //     email: "outroemailbandafunciona@gmail.com"
    // });

    // // buscando id da banda na tabela banda
    // const buscaIdBanda = await Banda.findOne({
    //     where: {
    //         id_usuario: idUsuario
    //     }
    // })
    // const idBanda = buscaIdBanda.dataValues.id_banda;



    // console.log("buscaidBanda: ", buscaIdBanda.dataValues)

    // // buscando o id dos integrantes na tabela usuario 
    // const buscaIdMusico = await Usuario.findOne({
    //     where: {
    //         nome: "Erika"
    //     }
    // })
    // const idMusico = buscaIdMusico.dataValues.id_usuario;
    // console.log("idMusico: ", buscaIdMusico.dataValues)


    // // inserindo o id da banda e dos integrantes na tabela intermediaria
    // const resultado4 = await BandaIntegrantes.create({
    //     id_banda: idBanda,
    //     id_integrante: idMusico,
    //     funcao: "guitarrista"
    // });

    const cidade = 'Alagoinha'
    const estado = 'PE'

    // Buscando o id_cidade e id_estado na tabela cidade
    const findIdCidade = await Cidade.findAll({
        // attributes: ['id_cidade','nome'],
        //Inner join
        include: [{
            // com a tabela Estado
            model: Estado, 
            // utilizando a chave estabelecida na associação do model Cidade com Estado, cujo alias é 'estado'
            as: 'estado',
            // com um filtro adicional do estado que o usuário digitou
            where: {
                uf: estado
            }
            }],
            // e um último filtro da cidade que o usuário digitou
        where: { 
            nome: cidade 
        },
    });

    // SELECT `Cidade`.`id_cidade`, `Cidade`.`nome`, `Cidade`.`id_estado`, `estado`.`id_estado`, `estado`.`uf`
    // FROM band_plus.cidade AS `Cidade`
    // INNER JOIN band_plus.estado AS `estado` 
    // ON `Cidade`.`id_estado` = `estado`.`id_estado` 
    // AND `estado`.`uf` = 'PE' 
    // AND `Cidade`.`nome` = 'Alagoinha';

    console.log(findIdCidade[0].dataValues.id_cidade)
    console.log(findIdCidade[0].dataValues.nome)
    console.log(findIdCidade[0].dataValues.id_estado)
    // console.log(findIdCidade[0].dataValues.estado.dataValues.uf)

}

busca()

console.log("terminei")
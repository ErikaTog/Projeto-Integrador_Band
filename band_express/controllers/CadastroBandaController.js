const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('../config/database');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado} = require('../models')
const {check, validationResult, body} = require('express-validator');

const cadastroBandaController = {
    pre: (req, res) => {
        return res.render('pre-cadastro')
    },

    irfeed: (req, res) => {
        return res.render('feed')
    },
    
    formBanda: async (req, res) => {

        //fazendo a busca de todos os estados
        const buscaEstados = await Estado.findAll({})

        //criando uma variável que vai conter a lista de estados
        listaEstados = []
    
        //buscando os estados e incluindo na lista
        buscaEstados.forEach((estado) => {
            listaEstados.push(estado.dataValues.uf)
        })

        return res.render('form-banda', {estados: listaEstados});
    },  

    saveBanda: async (req, res) => {
        let listaDeErros = validationResult(req).array({onlyFirstError: true});

        if (!listaDeErros.length) {
            const {nome, email, senha, genero, sobre, estado, cidade, site, canal, emailBanda, integrante, funcao} = req.body;


        // ----------------Em desenvolvimento ----------------------
           //buscando as cidades de acordo com o estado escolhido pelo usuário
            // const findCidades = await Cidade.findAll({
            //     //Inner join
            //     include: [{
            //         // com a tabela Estado
            //         model: Estado,
            //         // utilizando a chave estabelecida na associação do model Cidade com Estado, cujo alias é 'estado'
            //         as: 'estado',
            //         // com um filtro adicional do estado que o usuário digitou
            //         where: {
            //             uf: estado
            //         }
            //     }]            
            // });
            
            //lista onde ficarão armazenadas as cidades
            // let listaCidades = []
                    
            //buscando as cidades e incluindo na lista
            // findCidades.forEach((cidade) => {
            //     listaCidades.push(dataValues.nome)
            // })
        // --------------------------------------------------
        
            // Buscando o id_cidade e id_estado na tabela cidade
            const findIdCidade = await Cidade.findAll({
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
    
            const idCidade = findIdCidade[0].dataValues.id_cidade;
            const idEstado = findIdCidade[0].dataValues.id_estado;
    
            // Cadastrando dados na tabela usuario
            const resultado1 = await Usuario.create({
                nome,
                email,
                senha: bcrypt.hashSync(senha, 10),
                data_cadastro: new Date(),
                id_cidade: idCidade,
                id_estado: idEstado,
                id_tipos_perfil: 2
            });
    
    
            // Buscando o id do usuário
            const buscaId = await Usuario.findOne({
                where: {
                    nome: nome
                }
            })
            const idUsuario = buscaId.dataValues.id_usuario;
    
    
            // inserindo dados complementares de banda na tabela banda
            const resultado2 = await Banda.create({
                id_usuario: idUsuario,
                genero,
                sobre,
                site,
                canal,
                email: emailBanda
            });
    
    
            // buscando id_banda na tabela banda
            const buscaIdBanda = await Banda.findOne({
                where: {
                    id_usuario: idUsuario
                }
            })
            const idBanda = buscaIdBanda.dataValues.id_banda;
    
    
            // buscando o id dos integrantes na tabela usuario 
            const buscaIdMusico = await Usuario.findOne({
                where: {
                    nome: integrante
                }
            })
            const idMusico = buscaIdMusico.dataValues.id_usuario;
    
    
            // inserindo o id da banda e dos integrantes na tabela intermediaria
            const resultado4 = await BandaIntegrantes.create({
                id_banda: idBanda,
                id_integrante: idMusico,
                funcao
            });
    
            console.log(req.body)
    
            return res.redirect('/feed')

        }else{
            return res.render('form-banda', {errors:listaDeErros})
        }
    }
        
}


module.exports = cadastroBandaController;
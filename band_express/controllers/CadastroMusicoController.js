const { Estado, Cidade, Usuario, Musico, Instrumento, Tecnico, MusicoInstrumentos, MusicoTecnicos } = require('../models');
const bcrypt = require('bcrypt');
const { validationResult} = require('express-validator');

const cadastroMuicoController = {
    formMusician: (req, res) => {
        return res.render('form-musico');
    },
    error: (req, res) => {
        let errors = validationResult(req).array({ onlyFirstError: true });

        if(errors) {
            return res.render('form-musico', { errors: errors });
        } 
    },
    saveMusician: async (req, res) => {

        // let errors = validationResult(req).array({ onlyFirstError: true });

        // if(!errors) {
        //     return res.render('form-musico', { errors: errors });
        // } else {
            
        // }


        const { nome, senha, email, sexo, sobre, estado, cidade, site, canal, canto, toco, tecnico, instrumento, habilidadeTecnica } = req.body;

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

        // Inserindo informação na tabela usuario   
        const dadosUsuario = await Usuario.create({
            nome,
            email,
            senha: bcrypt.hashSync(senha, 10),
            data_cadastro: new Date(),
            id_cidade: idCidade,
            id_estado: idEstado,
            id_tipos_perfil: 1
        })

        // Inserindo dados complementares na tabela músico
        const dadosMusico = await Musico.create({
            sexo,
            sobre,
            site,
            canal,
            canto,
            toco,
            tecnico,
            id_usuario: dadosUsuario.id_usuario
        });

        // Buscando o id_instrumento
        const findIdInstrumento = await Instrumento.findOne({
            where: {
                instrumento
            }
        });

        const idInstrumento = findIdInstrumento.dataValues.id_instrumento;
        console.log(idInstrumento)

        // Buscando o id_tecnico
        const findIdTecnico = await Tecnico.findOne({
            where: {
                habilidade_tecnica: habilidadeTecnica
            }
        });

        const idTecnico = findIdTecnico.dataValues.id_tecnico;

        // Inserindo id_instrumento e id_tecnico nas tabelas intermediárias
        const dadosToco = await MusicoInstrumentos.create({
           id_musico: dadosMusico.id_musico,
           id_instrumento:  idInstrumento
        });
        
        const dadosTecnicos = await MusicoTecnicos.create({
            id_musico: dadosMusico.id_musico,
            id_tecnico:  idTecnico
         });

        res.redirect('/feed');
    }
}

module.exports = cadastroMuicoController;
const { Estado, Cidade, Usuario, Musico, Instrumento, Tecnico, MusicoInstrumentos, MusicoTecnicos } = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const cadastroMuicoController = {
    formMusician: async (req, res) => {

        // Buscar todos os estados
        const findEstados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });

        listaEstados = [];
        findEstados.forEach(estado => {
            listaEstados.push(estado.uf)
        });
        
        // Buscar todos os instrumentos
        const findInstrumentos = await Instrumento.findAll({ 
            raw: true,
            attributes: ['instrumento'] 
        });
        
        listaInstrumentos = [];
        findInstrumentos.forEach(instrumento => {
            listaInstrumentos.push(instrumento.instrumento)
        });

        // Buscar todas as habilidades
        const findTecnicos = await Tecnico.findAll({ 
            raw: true,
            attributes: ['habilidade_tecnica'] 
        });
        
        listaTecnicos = [];
        findTecnicos.forEach(instrumento => {
            listaTecnicos.push(instrumento.habilidade_tecnica)
        });

        return res.render('form-musico', { listaEstados, listaInstrumentos, listaTecnicos });
    },
    saveMusician: async (req, res) => {

        try {
            let { nome, senha, email, sexo, sobre, estado, cidade, site, canal, canto, toco, tecnico, instrumento, habilidadeTecnica } = req.body;
    
            console.log(req.body);
    
            nome = nome.trim(); 
            senha = senha.trim();
            email = email.trim();
            sobre = sobre.trim();
            estado = estado.trim();
            cidade = cidade.trim(); 
            site = site.trim();
            canal = canal.trim();
            instrumento = instrumento.trim();
            habilidadeTecnica = habilidadeTecnica.trim();
    
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
    
            if (toco) {
                // Buscando o id_instrumento
                const findIdInstrumento = await Instrumento.findOne({
                    where: {
                        instrumento
                    }
                });
        
                const idInstrumento = findIdInstrumento.dataValues.id_instrumento;
                console.log(idInstrumento)
                
                // Inserindo id_instrumento nas tabelas intermediárias
                const dadosToco = await MusicoInstrumentos.create({
                   id_musico: dadosMusico.id_musico,
                   id_instrumento:  idInstrumento
                });
            }
    
            if (tecnico) {
                // Buscando o id_tecnico
                const findIdTecnico = await Tecnico.findOne({
                    where: {
                        habilidade_tecnica: habilidadeTecnica
                    }
                });
        
                const idTecnico = findIdTecnico.dataValues.id_tecnico;
                
                // Inserindo id_tecnico nas tabelas intermediárias
                const dadosTecnicos = await MusicoTecnicos.create({
                    id_musico: dadosMusico.id_musico,
                    id_tecnico:  idTecnico
                 });
            }
    
            res.redirect('/feed');
        }
        catch(erro) {
            console.log(erro);
        }

    }
}

module.exports = cadastroMuicoController;
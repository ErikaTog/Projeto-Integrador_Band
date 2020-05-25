const { validationResult } = require('express-validator');
const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');

const perfilEditarMusico = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        // Buscar informação da tabela usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
            raw: true,
            attributes: ['avatar', 'wallpaper', 'cidade.nome', 'cidade.estado.uf'],
            include: [{
                model: Cidade,
                as: 'cidade',
                attributes: [],
                include: [{
                    model: Estado,
                    as: 'estado',
                    attributes: [],
                }]
            }]
        });

        // Buscar informação da tabela músico
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico', 'sobre', 'site', 'canal', 'canto', 'toco', 'tecnico'] 
        });

        // Buscar informação das habilidades - instrumentos
        let instrumentos = [];

        if (dadosMusico.toco) {
            instrumentos = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
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
        };
        
        // Buscar informação das habilidades - tecnicos
        let tecnicos = [];

        if (dadosMusico.tecnico) {
            tecnicos = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                raw: true,
                attributes: ['musicosTec.habilidade_tecnicas.habilidade_tecnica'], 
                include: [
                    {
                        model: MusicoTecnicos,
                        as: 'musicosTec',
                        attributes: [],
                        include: [
                            {
                                model: Tecnico,
                                as: 'habilidade_tecnicas',
                                attributes: []
                            }
                        ]
                    }
                ],
            });
        }
        
        // Buscar quantidade de seguidores e seguindo
        const seguidores = await Minha_rede.count({ where: { id_usuario: req.session.usuario.id_usuario } });
        const seguindo = await Minha_rede.count({ where: { id_usuario_seguido: req.session.usuario.id_usuario } });

        // Buscar áudios
        const audios = await Audio.findAll({
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['tipo', 'titulo', 'caminho'],
            limit: 4
        });

        // Buscar vídeos
        const videos = await Video.findAll({
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['tipo', 'titulo', 'caminho'],
            limit: 4
        });

        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });

        // Buscar todos os instrumentos
        const listaInstrumentos = await Instrumento.findAll({ 
            raw: true,
            attributes: ['instrumento'] 
        });

        // Buscar todas as habilidades
        const listaTecnicos = await Tecnico.findAll({ 
            raw: true,
            attributes: ['habilidade_tecnica'] 
        });

        if(errors.length) {
            return res.render('perfil-musico-editar', {
                usuario: req.session.usuario,
                dadosUsuario,
                dadosMusico, 
                instrumentos, 
                tecnicos, 
                seguidores, 
                seguindo, 
                audios, 
                videos,
                estados,
                listaInstrumentos,
                listaTecnicos,
                errors: errors 
            });
        } 

        next();
    }
}

module.exports = perfilEditarMusico;
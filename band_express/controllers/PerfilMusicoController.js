const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');

const perfilMusicoController = {
    show: async (req, res) => {
        
        // Buscar informação da tabela usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
            raw: true,
            attributes: ['nome', 'email', 'senha', 'id_estado', 'id_cidade', 'avatar', 'wallpaper'] 
        });

        // Buscar cidade e estado
        const findCidadeEstado = await Cidade.findAll({   
            include:[
                {
                    model: Estado,
                    as: 'estado',
                    attributes: ['uf'],
                    where: {
                        id_estado: dadosUsuario.id_estado
                    }
                }
            ],
            where: { id_cidade: dadosUsuario.id_cidade },
            attributes: ['nome'],
        });

        const cidade = findCidadeEstado[0].dataValues.nome;
        const estado = findCidadeEstado[0].dataValues.estado.uf;

        // Buscar informação da tabela músico
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico', 'sobre', 'site', 'canal', 'canto', 'toco', 'tecnico'] 
        });

        // Buscar informação das habilidades - instrumentos
        let instrumentos = [];

        if (dadosMusico.toco) {
            const buscarInstrumentos = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                include: [
                    {
                        model: MusicoInstrumentos,
                        as: 'musicos',
                        include: [
                            {
                                model: Instrumento,
                                as: 'instrumentos',
                                attributes: ['instrumento']
                            }
                        ]
                    }
                ],
            });
        
            let instrumentosBuscados = buscarInstrumentos[0].dataValues.musicos;
        
            instrumentosBuscados.forEach(musico => {
                instrumentos.push(musico.instrumentos.dataValues.instrumento);
            });
        };
        
        // Buscar informação das habilidades - tecnicos
        let tecnicos = [];

        if (dadosMusico.tecnico) {
            const buscarHabilTecnicas = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                include: [
                    {
                        model: MusicoTecnicos,
                        as: 'musicosTec',
                        include: [
                            {
                                model: Tecnico,
                                as: 'habilidade_tecnicas',
                                attributes: ['habilidade_tecnica']
                            }
                        ]
                    }
                ],
            });
        
            let tecnicosBuscados = buscarHabilTecnicas[0].dataValues.musicosTec;
        
            tecnicosBuscados.forEach(musico => {
                tecnicos.push(musico.habilidade_tecnicas.dataValues.habilidade_tecnica);
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
        })
        console.log(videos)

        res.render('perfil-musico', { 
            title: 'Perfil', 
            usuario: req.session.usuario,
            dadosUsuario, 
            cidade, 
            estado, 
            dadosMusico, 
            instrumentos, 
            tecnicos, 
            seguidores, 
            seguindo, 
            audios, 
            videos
        });
    }
}

module.exports = perfilMusicoController;
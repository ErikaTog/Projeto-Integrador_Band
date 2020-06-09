const bcrypt = require('bcrypt');
const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');

const perfilMusicoController = {
    showUser: async (req, res) => {

        // Busca na tabela Usuario e Musico
        const buscaMusico = await Usuario.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: [ 'id_usuario', 'nome', 'email', 'avatar', 'wallpaper', 'musico.id_musico', 'musico.sobre', 'musico.site', 'musico.canal', 'musico.canto', 'musico.toco', 'musico.tecnico'],
            include: [{
                model: Musico,
                as: 'musico',
                attributes: [],
            }]
        });

        // Busca cidade e UF
        const buscaLocal = await Usuario.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['cidade.cidade', 'cidade.estado.uf'],
            include: [{
                model: Cidade,
                as: 'cidade',
                attributes: [],
                include: [{
                    model: Estado,
                    as: 'estado',
                    attributes: [],
                }],
            }]
        });

        // Concatenar os objetos de busca
        let dadosMusico = Object.assign({}, buscaMusico, buscaLocal);

        // Buscar informação das habilidades - instrumentos
        let instrumentos = [];

        if (dadosMusico.toco) {
            instrumentos = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                raw: true,
                attributes: ['musicos.instrumentos.instrumento'], 
                include: [{
                    model: MusicoInstrumentos,
                    as: 'musicos',
                    attributes: [],
                    include: [{
                        model: Instrumento,
                        as: 'instrumentos',
                        attributes: []
                    }]
                }],
            });
        };
        
        // Buscar informação das habilidades - tecnicos
        let tecnicos = [];

        if (dadosMusico.tecnico) {
            tecnicos = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                raw: true,
                attributes: ['musicosTec.habilidade_tecnicas.habilidade_tecnica'], 
                include: [{
                    model: MusicoTecnicos,
                    as: 'musicosTec',
                    attributes: [],
                    include: [{
                        model: Tecnico,
                        as: 'habilidade_tecnicas',
                        attributes: []
                    }]
                }],
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

        res.render('perfil-musico', { 
            title: 'Perfil',
            usuario: req.session.usuario,
            dadosMusico, 
            instrumentos, 
            tecnicos, 
            seguidores, 
            seguindo, 
            audios, 
            videos,
            errors: req.flash('errorValidator')
        });
    },
    show: async (req, res) => {
        
        try {

            // Buscar informação da tabela usuario - buscar pelo id
            const dadosMusico = await Musico.findOne({ 
                where: { id_musico: req.params.id },
                raw: true,
                attributes: ['id_musico', 'sobre', 'site', 'canal', 'canto', 'toco', 'tecnico', 'id_usuario', 'usuario.nome', 'usuario.email', 'usuario.avatar', 'usuario.wallpaper', 'usuario.cidade.cidade', 'usuario.cidade.estado.uf'],
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: [],
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
                }]
            });

            // Buscar informação das habilidades - instrumentos
            let instrumentos = [];

            if (dadosMusico.toco) {
                instrumentos = await Musico.findAll({
                    where: { id_musico: dadosMusico.id_musico },
                    raw: true,
                    attributes: ['musicos.instrumentos.instrumento'], 
                    include: [{
                        model: MusicoInstrumentos,
                        as: 'musicos',
                        attributes: [],
                        include: [{
                            model: Instrumento,
                            as: 'instrumentos',
                            attributes: []
                        }]
                    }],
                });
            };
            
            // Buscar informação das habilidades - tecnicos
            let tecnicos = [];

            if (dadosMusico.tecnico) {
                tecnicos = await Musico.findAll({
                    where: { id_musico: dadosMusico.id_musico },
                    raw: true,
                    attributes: ['musicosTec.habilidade_tecnicas.habilidade_tecnica'], 
                    include: [{
                        model: MusicoTecnicos,
                        as: 'musicosTec',
                        attributes: [],
                        include: [{
                            model: Tecnico,
                            as: 'habilidade_tecnicas',
                            attributes: []
                        }]
                    }],
                });
            }
            
            // Buscar quantidade de seguidores e seguindo
            const seguidores = await Minha_rede.count({ where: { id_usuario: dadosMusico.id_usuario } });
            const seguindo = await Minha_rede.count({ where: { id_usuario_seguido: dadosMusico.id_usuario } });

            // Buscar áudios
            const audios = await Audio.findAll({
                where: { id_usuario: dadosMusico.id_usuario },
                raw: true,
                attributes: ['tipo', 'titulo', 'caminho'],
                limit: 4
            });

            // Buscar vídeos
            const videos = await Video.findAll({
                where: { id_usuario: dadosMusico.id_usuario },
                raw: true,
                attributes: ['tipo', 'titulo', 'caminho'],
                limit: 4
            });

            res.render('perfil-musico', { 
                title: 'Perfil',
                usuario: req.session.usuario,
                dadosMusico, 
                instrumentos, 
                tecnicos, 
                seguidores, 
                seguindo, 
                audios, 
                videos,
                errors: req.flash('errorValidator')
            });
            
        } catch (error) {
            // Quando o usuário digita um id_musico (req_params) que não existe
            return res.redirect('/home');
        }

    },
    changePassword: async (req, res) => {
        let { senhaNova } = req.body;
        
        senhaNova = bcrypt.hashSync(senhaNova, 10);

        const senhaBD = await Usuario.findOne({ where: { id_usuario: req.session.usuario.id_usuario } });

        senhaBD.senha = senhaNova;

        await senhaBD.save({ fields: ['senha'] });

        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico'] 
        });

        res.redirect(`/perfil/musico/${dadosMusico.id_musico}`);
    }
}

module.exports = perfilMusicoController;
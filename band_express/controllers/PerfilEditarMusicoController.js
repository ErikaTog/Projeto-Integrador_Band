const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');
const fs = require('fs');

const perfilEditarMusicoController = {
    show: async (req, res) => {
        // Buscar informação da tabela usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
            raw: true,
            attributes: ['avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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

        // Usado nos campos select
        
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

        res.render('perfil-musico-editar', { 
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
            errors: req.flash('errorValidator'),
            errorsImage: req.flash('errorImage'),
        });
    },
    change: async (req, res) => {

        console.log(req.body);

        let { nome, sobre, estado, cidade, site, canal, email } = req.body;

        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
        });
        
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }, 
        });
        
        // Buscar o id_cidade e id_estado na tabela cidade
        const findIdLocal = await Cidade.findOne({
            where: { cidade },
            raw: true,
            attributes: ['id_cidade', 'estado.id_estado'],
            include: [{
                model: Estado, 
                as: 'estado',
                attributes: [],
                where: { uf: estado }
            }]
        });

        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.email = email;
        dadosUsuario.id_estado = findIdLocal.id_estado;
        dadosUsuario.id_cidade = findIdLocal.id_cidade;
        dadosMusico.sobre = sobre;
        dadosMusico.site = site;
        dadosMusico.canal = canal;

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'email', 'id_cidade', 'id_estado'] });
        await dadosMusico.save({ fields: ['sobre', 'site', 'canal'] });

        // Setar session do usuario
        let usuario = { 
            id_usuario: dadosUsuario.id_usuario, 
            nome: dadosUsuario.nome, 
            senha: dadosUsuario.senha, 
            email: dadosUsuario.email,
            id_tipos_perfil: 1
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect(`/perfil/musico/${dadosMusico.id_musico}`);
    },
    saveSkills: async (req, res) => {

        const { canto, toco, tecnico, instrumento, habilidade_tecnica } = req.body;

        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }
        });

        // Salvar canto
        if (canto) {
            dadosMusico.canto = canto;
            await dadosMusico.save({ fields: ['canto'] });
        };

        // Salvar instrumento
        if (toco) {
            dadosMusico.toco = toco;
            await dadosMusico.save({ fields: ['toco'] });

            // Buscando o id_instrumento
            const findIdInstrumento = await Instrumento.findOne({
                where: { instrumento },
                raw: true,
                attributes: ['id_instrumento']
            });
            
            // Inserindo id_instrumento nas tabelas intermediárias
            await MusicoInstrumentos.create({
                id_musico: dadosMusico.id_musico,
                id_instrumento: findIdInstrumento.id_instrumento
            });
        };

        // Salvar habilidade técnica
        if (tecnico) {
            dadosMusico.tecnico = tecnico;
            await dadosMusico.save({ fields: ['tecnico'] });

            // Buscando o id_instrumento
            const findIdTecnico = await Tecnico.findOne({
                where: { habilidade_tecnica },
                raw: true,
                attributes: ['id_tecnico']
            });
            
            // Inserindo id_instrumento nas tabelas intermediárias
            await MusicoTecnicos.create({
                id_musico: dadosMusico.id_musico,
                id_tecnico: findIdTecnico.id_tecnico
            });
        };

        res.redirect(`/perfil/editar/musico`);
    },
    changeAvatar: async (req, res, next) => {

        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorImage', 'Para alterar a imagem do seu avatar precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
            res.redirect('/perfil/editar/musico')
            return
        }
        
        // Excluir os arquivos de imagem
        const avatarZero = "/img/avatar_zero.png";

        const avatarBd = await Usuario.findOne({
            raw: true,
            attributes: ['avatar'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = avatarBd.avatar.slice(13)    

        if (avatarBd.avatar != avatarZero) {
            fs.unlinkSync(`./public/img/uploads/${cutPath}`);
        }

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.avatar = pathFile;

        await dadosUsuario.save({ fields: ['avatar'] });

        res.redirect(`/perfil/editar/musico`);

    },
    changeWallpaper: async (req, res, next) => {

        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorImage', 'Para alterar a imagem do seu fundo precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
            res.redirect('/perfil/editar/musico')
            return
        }
        
        // Excluir os arquivos de imagem
        const wallpaperZero = "/img/fundo_zero.png";

        const wallpaperBd = await Usuario.findOne({
            raw: true,
            attributes: ['wallpaper'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = wallpaperBd.wallpaper.slice(13)    

        if (wallpaperBd.wallpaper != wallpaperZero) {
            fs.unlinkSync(`./public/img/uploads/${cutPath}`);
        }

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.wallpaper = pathFile;

        await dadosUsuario.save({ fields: ['wallpaper'] });

        res.redirect(`/perfil/editar/musico`);
    },
    saveVideoFile: async (req, res) => {
        // console.log(req.files, req.body);

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        console.log(pathFile);


        res.redirect(`/perfil/editar/musico`);
    }
}

module.exports = perfilEditarMusicoController;
const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');
const fs = require('fs');
const { Op } = require('sequelize');

const perfilEditarMusicoController = {
    show: async (req, res) => {
        // Buscar informação da tabela usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
            raw: true,
            attributes: ['id_usuario', 'id_estado', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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
        let instrumentosUsuario = [];

        if (dadosMusico.toco) {
            instrumentosUsuario = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                raw: true,
                attributes: ['musicos.instrumentos.id_instrumento' ,'musicos.instrumentos.instrumento'], 
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
        let tecnicosUsuario = [];

        if (dadosMusico.tecnico) {
            tecnicosUsuario = await Musico.findAll({
                where: { id_musico: dadosMusico.id_musico },
                raw: true,
                attributes: ['musicosTec.habilidade_tecnicas.id_tecnico', 'musicosTec.habilidade_tecnicas.habilidade_tecnica'], 
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
            attributes: ['id_audio', 'tipo', 'titulo', 'caminho'],
            order: [['id_audio', 'DESC']],
            limit: 4,
        });

        // Buscar vídeos
        const videos = await Video.findAll({
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_video', 'tipo', 'titulo', 'caminho'],
            order: [['id_video', 'DESC']],
            limit: 4
        });

        // Usado nos campos select
        
        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true
        });

        // Buscar todas as cidades
        const cidades = await Cidade.findAll({ 
            raw: true
        });

        // Buscar as cidas do estado do Usuário
        const cidadesUsuario = await Cidade.findAll({
            raw: true,
            where: { id_estado: dadosUsuario.id_estado }
        })

        // Buscar todos os instrumentos
        const instrumentos = await Instrumento.findAll({ 
            raw: true,
            order: [['instrumento', 'ASC']]
        });

         // Buscar todas as habilidades
         const tecnicos = await Tecnico.findAll({ 
            raw: true,
            order: [['habilidade_tecnica', 'ASC']]
        });

        res.render('perfil-musico-editar', { 
            usuario: req.session.usuario,
            dadosUsuario,
            dadosMusico, 
            instrumentosUsuario, 
            tecnicosUsuario, 
            seguidores, 
            seguindo, 
            audios, 
            videos,
            estados,
            cidades,
            cidadesUsuario,
            instrumentos,
            tecnicos,
            errors: req.flash('errorValidator'),
            errorsImage: req.flash('errorImage'),
            errorsUpload: req.flash('errorUpload'),
        });
    },
    change: async (req, res) => {
        let { nome, sobre, estado, cidade, site, canal, email, videoAdd, videoTitulo, videoLink } = req.body;
        
        nome = nome.trim();
        sobre = sobre.trim();
        site = site.trim();
        canal = canal.trim();
        email = email.trim();
        videoTitulo = videoTitulo.trim();
        videoLink = videoLink.trim();

        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
        });
        
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }, 
        });

        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.email = email;
        dadosUsuario.id_estado = estado;
        dadosUsuario.id_cidade = cidade;
        dadosMusico.sobre = sobre;
        dadosMusico.site = site;
        dadosMusico.canal = canal;

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'email', 'id_cidade', 'id_estado'] });
        await dadosMusico.save({ fields: ['sobre', 'site', 'canal'] });

        // Verificar se o usuário quer add vídeo
        if (videoAdd) {
            let src;

            // Tratar os link
            // YouTube
            if (videoLink.includes('youtube.com')) {
                let urlYoutube = videoLink.split("=");
                src = `https://www.youtube.com/embed/${urlYoutube[1]}`
            }

            // Vimeo 
            if (videoLink.includes('vimeo.com')) {
                let urlVimeo = videoLink.split("/");
                src = `https://player.vimeo.com/video/${urlVimeo[3]}`
            }

            // Dailymotion
            if (videoLink.includes('dailymotion.com')) {
                let urlDaily = videoLink.split("/");
                src = `https://www.dailymotion.com/embed/video/${urlDaily[4]}`
            }

            // Salvando os dados no BD
            await Video.create({
                tipo: 'link',
                titulo: videoTitulo,
                caminho: src,
                id_usuario: req.session.usuario.id_usuario
            })
        }

        // Setar session do usuario
        let usuario = { 
            id_usuario: dadosUsuario.id_usuario, 
            nome: dadosUsuario.nome, 
            senha: dadosUsuario.senha, 
            email: dadosUsuario.email,
            avatar: dadosUsuario.avatar,
            id_tipos_perfil: 1,
            admin: dadosUsuario.admin
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect("/feedback");
    },
    saveSkills: async (req, res) => {

        const { canto, toco, tecnico, instrumento: id_instrumento, habilidade_tecnica: id_tecnico } = req.body;

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
            
            // Inserindo id_instrumento nas tabelas intermediárias
            await MusicoInstrumentos.create({
                id_musico: dadosMusico.id_musico,
                id_instrumento
            });
        };

        // Salvar habilidade técnica
        if (tecnico) {
            dadosMusico.tecnico = tecnico;
            await dadosMusico.save({ fields: ['tecnico'] });
            
            // Inserindo id_instrumento nas tabelas intermediárias
            await MusicoTecnicos.create({
                id_musico: dadosMusico.id_musico,
                id_tecnico
            });
        };

        res.redirect(`/perfil/editar/musico`);
    },
    changeAvatar: async (req, res) => {

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

        // Setar o novo avatar
        req.session.usuario.avatar = pathFile;

        res.redirect(`/perfil/editar/musico`);

    },
    changeWallpaper: async (req, res) => {

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
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorUpload', 'Para enviar o seu vídeo precisamos que seja salvo como arquivo MP4 ou OGG')
            res.redirect('/perfil/editar/musico')
            return
        }

        let { videoArquivoTitulo: titulo } = req.body;

        titulo = titulo.trim();

        // Se o título estiver vazio (space)
        if (!titulo || titulo.length > 255) {
            // Excluir o arquivo da pasta
            fs.unlinkSync(`./public/video/${req.files[0].filename}`);

            req.flash('errorUpload', 'Opa, quremos te ajudar para que a sua música fique famosa. Para isso, precisamos que nos diga o título!')
            res.redirect('/perfil/editar/musico')
            return
        }

        // Pegar o caminho do arquivo
        const caminho = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        await Video.create({
            tipo: 'arquivo',
            titulo,
            caminho,
            id_usuario: req.session.usuario.id_usuario
        })

        res.redirect(`/perfil/editar/musico`);
    },
    saveAudioFile: async (req, res) => {
        console.log(req.files, req.body);
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorUpload', 'Para enviar o seu áudio precisamos que seja salvo como arquivo MP3, FLAC, AIFF ou OGG')
            res.redirect('/perfil/editar/musico')
            return
        }

        let { audioArquivoTitulo: titulo } = req.body;

        titulo = titulo.trim();

        // Se o título estiver vazio (space)
        if (!titulo || titulo.length > 255) {
            // Excluir o arquivo da pasta
            fs.unlinkSync(`./public/audio/${req.files[0].filename}`);

            req.flash('errorUpload', 'Opa, quremos te ajudar para que a sua música fique famosa. Para isso, precisamos que nos diga o título!')
            res.redirect('/perfil/editar/musico')
            return
        }

        // Pegar o caminho do arquivo
        const caminho = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        await Audio.create({
            tipo: 'arquivo',
            titulo,
            caminho,
            id_usuario: req.session.usuario.id_usuario
        })

        res.redirect(`/perfil/editar/musico`);
    },
    deleteCanto: async (req, res) => {

        const musicoDados = await Musico.findOne({
            where: { id_usuario: req.session.usuario.id_usuario }
        });

        // Alterar campo canto na tabela Musico
        musicoDados.canto = 0;

        await musicoDados.save({ fields: ['canto'] });

        res.redirect(`/perfil/editar/musico`);
    },
    deleteInstrument: async (req, res) => {

        const musicoDados = await Musico.findOne({
            where: { id_usuario: req.session.usuario.id_usuario }
        });
        
        // Excluir o instrumento da tabela intermediária
        await MusicoInstrumentos.destroy({
            where: {
                [Op.and]: [
                    { id_musico: musicoDados.id_musico },
                    { id_instrumento: req.params.id }
                ]
            }
        });
        
        // Verificar se o usuário possui outros instrumentos cadastrados
        const contarInstrumento = await MusicoInstrumentos.count({ where: { id_musico: musicoDados.id_musico } });
        
        if (!contarInstrumento) {            
            musicoDados.toco = 0;

            await musicoDados.save({ fields: ['toco'] });
        }

        res.redirect(`/perfil/editar/musico`);
    },
    deleteTecnico: async (req, res) => {

        const musicoDados = await Musico.findOne({
            where: { id_usuario: req.session.usuario.id_usuario }
        });
        
        // Excluir a habilidade técnica da tabela intermediária
        await MusicoTecnicos.destroy({
            where: {
                [Op.and]: [
                    { id_musico: musicoDados.id_musico },
                    { id_tecnico: req.params.id }
                ]
            }
        });
        
        // Verificar se o usuário possui outra habilidade técnica cadastrada
        const contarHabilTecnica = await MusicoTecnicos.count({ where: { id_musico: musicoDados.id_musico } });
        
        if (!contarHabilTecnica) {            
            musicoDados.tecnico = 0;

            await musicoDados.save({ fields: ['tecnico'] });
        }

        res.redirect(`/perfil/editar/musico`);
    },
    deleteVideo: async (req, res) => {
        
        // Excluir a habilidade técnica da tabela intermediária
        await Video.destroy({
            where: {
                [Op.and]: [
                    { id_usuario: req.session.usuario.id_usuario },
                    { id_video: req.params.id }
                ]
            }
        });

        res.redirect(`/perfil/editar/musico`);
    },
    deleteAudio: async (req, res) => {
        
        // Excluir a habilidade técnica da tabela intermediária
        await Audio.destroy({
            where: {
                [Op.and]: [
                    { id_usuario: req.session.usuario.id_usuario },
                    { id_audio: req.params.id }
                ]
            }
        });

        res.redirect(`/perfil/editar/musico`);
    },
}

module.exports = perfilEditarMusicoController;
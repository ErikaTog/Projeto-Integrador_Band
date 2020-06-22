const fs = require("fs");
const { Op } = require('sequelize');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')

const perfilEditarBandaController = {
    show: async (req, res) => {
      
        //Pegando o id_usuario
        let id_usuario = req.session.usuario.id_usuario
  

        //Pegando o nome da banda
        let nomeBanda = req.session.usuario.nome
 

        //Pegando o email da banda
        let emailBanda = req.session.usuario.email
 

        //Selecionando os dados da banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda', 'genero', 'sobre', 'site', 'canal'],
            where: {
                id_usuario
            }
        })
        

        // Selecionando o Estado, a Cidade, o Avatar e o Wallpaper da Banda na tabela usuario
        const dadosUsuarioBanda = await Usuario.findOne({
            raw: true,
            attributes: ['id_usuario', 'avatar', 'wallpaper', 'id_estado', 'cidade.cidade', 'cidade.estado.uf'],
            include: [{
                attributes: [],
                model: Cidade,
                as: 'cidade',
                include: [{
                    attributes: [],
                    model: Estado,
                    as: 'estado'
                }]
            }],
            where: {
                id_usuario
            }
        })
      
        
        // Selecionando o nome, função e avatar dos integrantes
        const integrantes = await BandaIntegrantes.findAll({
            raw: true,
            attributes: ['id_integrante', 'integrantesUsuario.nome', 'funcao', 'integrantesUsuario.avatar'],
            include: [{
                attributes: [],
                model: Usuario,
                as: 'integrantesUsuario'
            }],
            where: {
                id_banda: dadosBanda.id_banda
            }

        })
   

        //Verificando a quantidade de usuários que a banda está seguindo
        let seguindo = await Minha_rede.count({
            where: {
                id_usuario
            }
        });


        //Verificando a quantidade de seguidores da banda
        let seguidores = await Minha_rede.count({
            where: {
                'id_usuario_seguido': id_usuario
            }
        });
        

        //Pegando os vídeos postados
        const videos = await Video.findAll({
            raw: true,
            attributes: ['id_video', 'tipo', 'titulo', 'caminho'],
            order: [['id_video', 'DESC']],
            limit: 4,
            where: {
                id_usuario
            }
        })
       

        //Pegando os áudios postados
        const audios = await Audio.findAll({
            raw: true,
            attributes: ['id_audio', 'tipo', 'titulo', 'caminho'],
            order: [['id_audio', 'DESC']],
            limit: 4,
            where: {
                id_usuario
            }
        })

        //Listando todos os Estados
        const estados = await Estado.findAll({ 
            raw: true,
        });

        // Listando todas as cidades
        const cidades = await Cidade.findAll({ 
            raw: true
        });

        // Listando todas as cidades do estado do usuário
         const cidadesUsuarioBanda = await Cidade.findAll({
            raw: true,
            where: {id_estado: dadosUsuarioBanda.id_estado}
        })
       
        return res.render('perfil-banda-editar', {
            usuario: req.session.usuario,
            nomeBanda,
            emailBanda,
            seguindo,
            seguidores,
            dadosBanda,
            dadosUsuarioBanda,
            integrantes,
            videos,
            audios,
            estados,
            cidades,
            cidadesUsuarioBanda,
            errors: req.flash('errorValidator'),
            errorsImage: req.flash('errorImage'),
            errorsUpload: req.flash('errorUpload'),
            errorDeleteInteg: req.flash('errorDeleteInteg')
        });
    },

       change: async (req, res) => {

        let { nome, sobre, funcao, estado, cidade, site, canal, email, videoAdd, videoTitulo, videoLink} = req.body;

        videoTitulo = videoTitulo.trim();
        videoLink = videoLink.trim();
    
        const dadosUsuario = await Usuario.findOne({ 
            where: { 
                nome: req.session.usuario.nome 
            },
        });
        
        const dadosBanda = await Banda.findOne({ 
            where: { 
                id_usuario: req.session.usuario.id_usuario 
            }, 
        });

        const dadosIntegrantes = await BandaIntegrantes.findAll({
            attributes: ['id_banda', 'id_integrante', 'funcao'],
            where: {
                id_banda: dadosBanda.id_banda,
            }
        });
        
       
        if(Array.isArray(funcao)){
            for (let i = 0; i < dadosIntegrantes.length; i++) {
                dadosIntegrantes[i].funcao = funcao[i].trim();
                await dadosIntegrantes[i].save({fields: ['funcao'] })            
            }
        }else{
            dadosIntegrantes[0].funcao = funcao.trim();
            await dadosIntegrantes[0].save({fields: ['funcao'] })  
        } 


        // Buscar o id_cidade e id_estado na tabela cidade
        const findIdLocal = await Cidade.findOne({
            raw: true,
            attributes: ['id_cidade', 'estado.id_estado'],
            where: { 
                cidade 
            },            
            include: [{
                model: Estado, 
                as: 'estado',
                attributes: [],
                where: { 
                    uf: estado 
                }
            }]
        });

        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.email = email;
        dadosUsuario.id_estado = estado;
        dadosUsuario.id_cidade = cidade;
        dadosBanda.sobre = sobre;
        dadosBanda.site = site;
        dadosBanda.canal = canal;

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'email', 'id_cidade', 'id_estado'] });
        await dadosBanda.save({ fields: ['sobre', 'site', 'canal'] });

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
            id_tipos_perfil: 2,
            admin: dadosUsuario.admin
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect("/feedback");
    },

    saveMembers: async (req, res) => {

        let { membro, funcao } = req.body;

        membro = membro.trim();
        funcao = funcao.trim();         
    
        //Selecionando o id_banda
        const idBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda'],
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });

        // buscando o id do novo membro na tabela usuario 
        const idNovoMembro = await Usuario.findOne({
            raw: true,
            attributes: ['id_usuario'],
            where: {
                nome: membro
            }
        });
            
        // inserindo o id da banda e do novo membro na tabela intermediaria
        const novoMembro = await BandaIntegrantes.create({
            id_banda: idBanda.id_banda,
            id_integrante: idNovoMembro.id_usuario,
            funcao
        });

    res.redirect('/perfil/editar/banda');       

    },

    changeAvatar: async (req, res, next) => {
     
        // se nenhum arquivo for enviado
        if (!req.files.length) {
        req.flash('errorImage', 'Para alterar a imagem do seu avatar precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
        res.redirect('/perfil/editar/banda')
        return
        }
     
      //Excluir arquivo anterior da pasta 
        const avatarZero = "/img/avatar_zero.png"

        const avatarBd = await Usuario.findOne({
            raw: true,
            attributes: ['avatar'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = avatarBd.avatar.slice(13)    

        if(avatarBd.avatar != avatarZero){
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

          
        res.redirect(`/perfil/editar/banda`);
    },

    changeWallpaper: async (req, res, next) => {
     
        // se nenhum arquivo for enviado
        if (!req.files.length) {
        req.flash('errorImage', 'Para alterar a imagem do seu avatar precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
        res.redirect('/perfil/editar/banda')
        return
        }
     
      //Excluir arquivo anterior da pasta 
        const wallpaperZero = "/img/fundo_zero.png"

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

          
        res.redirect(`/perfil/editar/banda`);
    },

    saveVideoFile: async (req, res) => {
        // console.log(req.files, req.body);
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorUpload', 'Para enviar o seu vídeo precisamos que seja salvo como arquivo MP4 ou WEBM')
            res.redirect('/perfil/editar/banda')
            return
        }

        let { videoArquivoTitulo: titulo } = req.body;

        titulo = titulo.trim();

        // Se o título estiver vazio (space)
        if (!titulo || titulo.length > 255) {
            // Excluir o arquivo da pasta
            fs.unlinkSync(`./public/video/${req.files[0].filename}`);

            req.flash('errorUpload', 'Opa, queremos te ajudar para que a sua música fique famosa. Para isso, precisamos que nos diga o título!')
            res.redirect('/perfil/editar/banda')
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

        res.redirect("/perfil/editar/banda");
    },

    saveAudioFile: async (req, res) => {
        console.log(req.files, req.body);
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorUpload', 'Para enviar o seu áudio precisamos que ele seja salvo como arquivo MP3, FLAC, AIFF ou OGG')
            res.redirect('/perfil/editar/banda')
            return
        }

        let { audioArquivoTitulo: titulo } = req.body;

        titulo = titulo.trim();

        // Se o título estiver vazio (space)
        if (!titulo || titulo.length > 255) {
            // Excluir o arquivo da pasta
            fs.unlinkSync(`./public/audio/${req.files[0].filename}`);

            req.flash('errorUpload', 'Opa, quremos te ajudar para que a sua música fique famosa. Para isso, precisamos que nos diga o título!')
            res.redirect('/perfil/editar/banda')
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

        res.redirect(`/perfil/editar/banda`);
    },

    deleteIntegrante: async (req, res) => {

        const bandaDados = await Banda.findOne({
            where: { id_usuario: req.session.usuario.id_usuario }
        });

        console.log("info1:" + bandaDados.id_banda)
        console.log("info2:" + req.params.id)


        //Verificando a quantidade de integrantes
        const integrantesQtd = await BandaIntegrantes.count({
            where: {
                id_banda: bandaDados.id_banda
            }
        })

        
        if(integrantesQtd > 1){
            // Excluir o integrante da tabela banda_integrantes
            await BandaIntegrantes.destroy({
                where: {
                    [Op.and]: [
                        { id_banda: bandaDados.id_banda },
                        { id_integrante: req.params.id }
                    ]
                }
            });        
           
        }else{
            //Não deixar exluir se houver somente 1
            req.flash('errorDeleteInteg', 'Sua banda não pode existir sem nenhum músico. Caso precise excluir esse integrante, primeiro inclua outro!')
            res.redirect('/perfil/editar/banda')
            return     
        }    

        res.redirect(`/perfil/editar/banda`);
    },

    deleteVideo: async (req, res) => {
        
        await Video.destroy({
            where: {
                [Op.and]: [
                    {id_usuario: req.session.usuario.id_usuario},
                    {id_video: req.params.id}
                ]
            }
        });

        res.redirect(`/perfil/editar/banda`);
    },

    deleteAudio: async (req, res) => {
                
        await Audio.destroy({
            where: {
                [Op.and]: [
                    {id_usuario: req.session.usuario.id_usuario},
                    {id_audio: req.params.id}
                ]
            }
        });

        res.redirect(`/perfil/editar/banda`);
    }
}


module.exports = perfilEditarBandaController;
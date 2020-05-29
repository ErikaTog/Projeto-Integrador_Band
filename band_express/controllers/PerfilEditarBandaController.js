const bcrypt = require('bcrypt');
const fs = require("fs");
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
            attributes: ['avatar', 'wallpaper', 'cidade.nome', 'cidade.estado.uf'],
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
            attributes: ['integrantesUsuario.nome', 'funcao', 'integrantesUsuario.avatar'],
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
            attributes: ['tipo', 'titulo', 'caminho'],
            where: {
                id_usuario
            }
        })
       

        //Pegando os áudios postados
        const audios = await Audio.findAll({
            raw: true,
            attributes: ['tipo', 'titulo', 'caminho'],
            where: {
                id_usuario
            }
        })

        //Listando todos os Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });
       
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
            estados
        });
    },
       change: async (req, res) => {

        let { nome, sobre, estado, cidade, site, canal, email } = req.body;

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
        
        // Buscar o id_cidade e id_estado na tabela cidade
        const findIdLocal = await Cidade.findOne({
            raw: true,
            attributes: ['id_cidade', 'estado.id_estado'],
            where: { 
                nome: cidade 
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
        dadosUsuario.id_estado = findIdLocal.id_estado;
        dadosUsuario.id_cidade = findIdLocal.id_cidade;
        dadosBanda.sobre = sobre;
        dadosBanda.site = site;
        dadosBanda.canal = canal;

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'email', 'id_cidade', 'id_estado'] });
        await dadosBanda.save({ fields: ['sobre', 'site', 'canal'] });

        // Setar session do usuario
        let usuario = { 
            id_usuario: dadosUsuario.id_usuario, 
            nome: dadosUsuario.nome, 
            senha: dadosUsuario.senha, 
            email: dadosUsuario.email,
            id_tipos_perfil: 2
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect(`/perfil/banda/${dadosBanda.id_banda}`);
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

    res.redirect(`/perfil/editar/banda/${idBanda}`);       

    },

    saveAvatar: async (req, res, next) => {
        console.log(req.files);

        //Excluir arquivo anterior

        const avatarZero = "/img/avatar_zero.png"

        const avatarBd = await Usuario.findOne({
            raw: true,
            attributes: ['avatar'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = avatarBd.avatar.slice(13)    

        if(avatarBd.avatar != avatarZero){
            fs.unlinkSync(`./public/img/avatars/${cutPath}`, function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');    
            })
        }


        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.avatar = pathFile;

        await dadosUsuario.save({ fields: ['avatar'] });

        // Renderiza perfil editar

        const dadosBanda = await Banda.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_banda']
        });

        res.redirect(`/perfil/editar/banda/${dadosBanda.id_banda}`);

    }
  
}


module.exports = perfilEditarBandaController;
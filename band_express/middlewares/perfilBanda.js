const { validationResult } = require('express-validator');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')

const perfilBanda = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)
  
        //Selecionando os dados da banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda', 'genero', 'sobre', 'site', 'canal', 'id_usuario'],
            where: {
                id_banda: req.params.id
            }
        })
        
        // Selecionando demais dados da banda nas tabelas usuario, cidade e estado
        const dadosUsuarioBanda = await Usuario.findOne({
            raw: true,
            attributes: ['nome', 'email', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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
                id_usuario: dadosBanda.id_usuario
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
                id_usuario: dadosBanda.id_usuario
            }
        });
    
        //Verificando a quantidade de seguidores da banda
        let seguidores = await Minha_rede.count({
            where: {
                'id_usuario_seguido': dadosBanda.id_usuario
            }
        });
 
        //Pegando os vídeos postados
        const videos = await Video.findAll({
            raw: true,
            attributes: ['tipo', 'titulo', 'caminho'],
            where: {
                id_usuario: dadosBanda.id_usuario
            }
        })
 

        //Pegando os áudios postados
        const audios = await Audio.findAll({
            raw: true,
            attributes: ['tipo', 'titulo', 'caminho'],
            where: {
                id_usuario: dadosBanda.id_usuario
            }
        })

        if(errors.length) {
            return res.render('perfil-banda', {
                title: 'Perfil',
                usuario: req.session.usuario,
                dadosBanda,
                dadosUsuarioBanda,
                integrantes,
                seguindo,
                seguidores,                
                videos,
                audios,
                errors: errors 
            });
        } 

        next();
    }
}

module.exports = perfilBanda;
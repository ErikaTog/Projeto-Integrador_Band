const bcrypt = require('bcrypt');
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
    }
  
}


module.exports = perfilEditarBandaController;
const bcrypt = require('bcrypt');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')
const { Op } = require('sequelize');


const perfilBandaController = {

    showUser: async (req, res) => {

        //Pegando o id_usuario
        let id_usuario = req.session.usuario.id_usuario
        // console.log('Id_usuario: ' + id_usuario)

        // Selecionando os dados da banda na tabela banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda', 'genero', 'sobre', 'site', 'canal', 'id_usuario'],
            where: {
                id_usuario
            }
        })
        // console.log(dadosBanda)

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
                id_usuario
            }
        })
        // console.log(dadosUsuarioBanda)

        
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
        // console.log(integrantes)

        
        //Verificando a quantidade de usuários que a banda está seguindo
        let seguindo = await Minha_rede.count({
            where: {
                id_usuario
            }
        });
        // console.log('Seguindo: '+ seguindo)


        //Verificando a quantidade de seguidores da banda
        let seguidores = await Minha_rede.count({
            where: {
                id_usuario_seguido: id_usuario
            }
        });
        // console.log('Seguidores: '+ seguidores)


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
        console.log(videos)

        
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
        console.log(audios) 


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
            errors: req.flash('errorValidator'),
        });
      
    },

    show: async (req, res) => {

        try {    

            // Selecionando os dados da banda na tabela banda
            const dadosBanda = await Banda.findOne({
                raw: true,
                attributes: ['id_banda', 'genero', 'sobre', 'site', 'canal', 'id_usuario'],
                where: {
                    id_banda: req.params.id
                }
            })
            // console.log(dadosBanda)


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
            // console.log(dadosUsuarioBanda)

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
            // console.log(integrantes)


            //Verificando a quantidade de usuários que a banda está seguindo
            let seguindo = await Minha_rede.count({
                where: {
                    id_usuario: dadosBanda.id_usuario
                }
            });
            // console.log('Seguindo: '+ seguindo)


            //Verificando a quantidade de seguidores da banda
            let seguidores = await Minha_rede.count({
                where: {
                    id_usuario_seguido: dadosBanda.id_usuario
                }
            });
            // console.log('Seguidores: '+ seguidores)


             // Verificar se o usuário já segue
             const segue = await Minha_rede.count({ 
                where: { 
                    [Op.and]: [
                        { id_usuario: req.session.usuario.id_usuario  },
                        { id_usuario_seguido: dadosBanda.id_usuario  }
                    ] 
                } 
            });
            

            //Pegando os vídeos postados
            const videos = await Video.findAll({
                raw: true,
                attributes: ['id_video', 'tipo', 'titulo', 'caminho'],
                order: [['id_video', 'DESC']],
                limit: 4,
                where: {
                    id_usuario: dadosBanda.id_usuario
                }
            })
            // console.log(videos)


            //Pegando os áudios postados
            const audios = await Audio.findAll({
                raw: true,
                attributes: ['id_audio', 'tipo', 'titulo', 'caminho'],
                order: [['id_audio', 'DESC']],
                limit: 4,
                where: {
                    id_usuario: dadosBanda.id_usuario
                }
            })
            // console.log(audios) 

            return res.render('perfil-banda', {
                title: 'Perfil',
                usuario: req.session.usuario,
                dadosBanda,
                dadosUsuarioBanda,
                integrantes,
                seguindo,
                seguidores,
                segue,
                videos,
                audios,
                errors: req.flash('errorValidator'),
            });

        } catch (error) {
            // Quando o usuário digita um id_banda (req_params) que não existe
            return res.status(404).render('feedbackGeral', { 
                imagem: '/img/feedback_404.svg',
                titulo: 'Pagina não encontrada',
                mensagem: 'Não encontramos essa página, tente mais tarde ou clique em voltar para a página inicial.',
                botao: 'Voltar'
            });
        }
    },

    changePassword: async (req, res) => {
        let { senhaNova } = req.body;
        
        senhaNova = bcrypt.hashSync(senhaNova, 10);

        const senhaBD = await Usuario.findOne({ 
            where: { 
                id_usuario: req.session.usuario.id_usuario 
            }
        });

        senhaBD.senha = senhaNova;

        await senhaBD.save({ fields: ['senha'] });

        const dadosBanda = await Banda.findOne({ 
            raw: true,
            attributes: ['id_banda'],
            where: { 
                id_usuario: req.session.usuario.id_usuario 
            } 
        });

        res.redirect(`/perfil/banda`);
    },

    loadVideo: async (req, res) => {
        const { id: id_usuario, page } = req.params;

        const limit = 4;

        const videos = await Video.findAll({
            where: { id_usuario },
            raw: true,
            attributes: ['id_video', 'tipo', 'titulo', 'caminho'],
            order: [['id_video', 'DESC']],
            offset: (limit * page),
            limit,
        });

        return res.send(videos);
    },
    
    loadAudio: async (req, res) => {
        const { id: id_usuario, page } = req.params;

        const limit = 4;
        
        const audios = await Audio.findAll({
            where: { id_usuario },
            raw: true,
            attributes: ['id_audio', 'tipo', 'titulo', 'caminho'],
            order: [['id_audio', 'DESC']],
            offset: (limit * page),
            limit,
        });

        return res.send(audios);
    },

    seguir: async (req, res) => {
        await Minha_rede.create({
            id_usuario: req.session.usuario.id_usuario,
            id_usuario_seguido: req.params.id
        });
        
        return;
    },

    naoSeguir: async (req, res) => {
        await Minha_rede.destroy({
            where: {
                [Op.and]: [
                    { id_usuario: req.session.usuario.id_usuario },
                    { id_usuario_seguido: req.params.id }
                ]
            }
        });
        

        return;
    }

}

module.exports = perfilBandaController;


const bcrypt = require('bcrypt');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')



const perfilBandaController = {
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
                    'id_usuario_seguido': dadosBanda.id_usuario
                }
            });
            // console.log('Seguidores: '+ seguidores)



            //Pegando os vídeos postados
            const videos = await Video.findAll({
                raw: true,
                attributes: ['tipo', 'titulo', 'caminho'],
                where: {
                    id_usuario: dadosBanda.id_usuario
                }
            })
            // console.log(videos)


            //Pegando os áudios postados
            const audios = await Audio.findAll({
                raw: true,
                attributes: ['tipo', 'titulo', 'caminho'],
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
                videos,
                audios
            });

        } catch (error) {
            return res.redirect('/home');
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

        res.redirect(`/perfil/banda/${dadosBanda.id_banda}`);
    }
}

module.exports = perfilBandaController;


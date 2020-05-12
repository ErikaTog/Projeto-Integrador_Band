const Sequelize = require ('sequelize');
const config = require ('../config/database');
const {Usuario, Banda, Integrante, BandaIntegrantes} = require('../models')


const cadastroController = {
    pre:(req, res)=>{
       return res.render('pre-cadastro')
    },

    formBanda:(req, res)=>{
        return res.render('form-banda');
    },

    saveBanda: async (req, res)=>{
        const {nome, email, senha, genero, sobre, estado, cidade, site, canal, emailBanda, integrante, funcao } = req.body;

        // inserindo banda nova na tabela usuario  
        const resultado1 = await Usuario.create({
            nome, 
            email,
            senha,
            data_cadastro:sequelize.fn('NOW'),
            admin: 0,
            avatar:NULL,
            link_perfil: NULL,
            wallpaper: NULL,
            perfil_id_perfil: 2
        });

        // buscando o id do usuario banda criado acima
        const buscaId = Usuario.findAll({
            where: {
                nome: nome
            }
        })
        const idUsuario = buscaId.id_usuario;

        // inserindo dados complementares de banda na tabela banda
        const resultado2 = await Banda.create({
            id_usuario: idUsuario,
            genero, 
            sobre,
            estado,
            cidade,
            site,
            canal,
            email:emailBanda
        });

        // buscando id da banda na tabela banda
        const buscaIdBanda = Banda.findAll({
            where: {
                id_usuario: idUsuario
            }
        })

        const idBanda = buscaIdBanda.id_banda;


        // buscando o id dos integrantes na tabela usuario 
        const buscaIdMusico = Usuario.findAll({
            where: {
                nome: integrante
            }
        })

        const idMusico = buscaIdMusico.id_usuario;
       
        // inserindo o id acima na tabela integrante
        const resultado3 = await Integrante.create({
            id_usuario: idMusico
        });
       
        //inserindo o id da banda e dos integrantes na tabela intermediaria
        const resultado4 = await BandaIntegrantes.create({
            id_banda: idBanda,
            id_integrantes: idMusico,
            funcao
        });

        
     // res.redirect('/rotafeed');
    //     console.log(req.body);

    //feed:(req, res) =>{
        //return res.render('feed');}
    }
    
}   

module.exports = cadastroController;
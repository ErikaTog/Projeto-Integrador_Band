const bcrypt = require('bcrypt');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado} = require('../models')

const cadastroBandaController = {
    
    formBanda: async (req, res) => {

        //Fazendo a busca de todos os estados
        const estados = await Estado.findAll({
            raw: true,
        });
        console.log(estados)

        
        // Fazendo a busca de todas as cidades
        const cidades = await Cidade.findAll({ 
            raw: true
        });
    
    
        return res.render('form-banda', {
            estados,
            cidades,
            errors: req.flash('errorValidator')
        });

    },

    saveBanda: async (req, res) => {

        let {nome, email, senha, genero, sobre, estado, cidade, site, canal, emailBanda, integrante, funcao} = req.body;

        nome = nome.trim();
        senha = senha.trim();
        email = email.trim();
        sobre = sobre ? sobre.trim() : '';
        site = site ? site.trim() : '';
        canal = canal ? canal.trim() : '';

    
        // Cadastrando dados na tabela usuario
        const dadosUsuario = await Usuario.create({
            nome,
            email,
            senha: bcrypt.hashSync(senha, 10),
            data_cadastro: new Date(),
            id_cidade: idCidade,
            id_estado: idEstado,
            link_perfil: nome,
            id_tipos_perfil: 2
        });

      
        // inserindo dados complementares de banda na tabela banda
        const dadosBanda = await Banda.create({
            id_usuario: dadosUsuario.id_usuario,
            genero,
            sobre,
            site,
            canal,
            email: emailBanda
        });

        // Salvar o campo link_perfil
        dadosUsuario.link_perfil = `localhost:3000/perfil/banda/${dadosBanda.id_banda}`;
        await dadosUsuario.save({ fields: ['link_perfil'] });


        // buscando o id dos integrantes na tabela usuario 
        const buscaIdMusico = await Usuario.findOne({
            raw: true,
            attributes: ['nome', 'id_usuario'],
            where: {
                nome: integrante
            }
        })
        const idMusico = buscaIdMusico.id_usuario;


        // inserindo o id da banda e dos integrantes na tabela intermediaria
        const resultado4 = await BandaIntegrantes.create({
            id_banda: dadosBanda.id_banda,
            id_integrante: idMusico,
            funcao
        });

        // Setar session do usuario
        let usuario = { id_usuario:dadosUsuario.id_usuario , nome, senha, email, avatar: dadosUsuario.avatar, id_tipos_perfil: 2};

        req.session.usuario = usuario;

        res.redirect('/home')

    }
}


module.exports = cadastroBandaController;
const { Estado, Cidade, Usuario, Musico, Instrumento, Tecnico, MusicoInstrumentos, MusicoTecnicos } = require('../models');
const bcrypt = require('bcrypt');

const cadastroMuicoController = {
    formMusician: async (req, res) => {

        // Buscar todos os estados
        const estados = await Estado.findAll({ 
            raw: true
        });

        // Buscar todas as cidades
        const cidades = await Cidade.findAll({ 
            raw: true
        });
        
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

        return res.render('form-musico', { 
            estados, 
            instrumentos, 
            tecnicos,
            cidades,
            errors: req.flash('errorValidator')
        });
    },
    saveMusician: async (req, res) => {

        let { nome, senha, email, sexo, sobre, estado: id_estado, cidade: id_cidade, site, canal, canto, toco, tecnico, instrumento: id_instrumento, habilidadeTecnica: id_tecnico } = req.body;

        nome = nome.trim();
        senha = senha.trim();
        senha = bcrypt.hashSync(senha, 10);
        email = email.trim();
        sobre = sobre ? sobre.trim() : '';
        site = site ? site.trim(): '';
        canal = canal ? canal.trim(): '';

        // Inserindo informação na tabela usuario   
        const dadosUsuario = await Usuario.create({
            nome,
            email,
            senha,
            data_cadastro: new Date(),
            id_cidade,
            id_estado,
            link_perfil: nome,
            id_tipos_perfil: 1
        })
        
        // Inserindo dados complementares na tabela músico
        const dadosMusico = await Musico.create({
            sexo,
            sobre,
            site,
            canal,
            canto,
            toco,
            tecnico,
            id_usuario: dadosUsuario.id_usuario
        });
        
        // Salvar o campo link_perfil
        dadosUsuario.link_perfil = `http://localhost:3000/perfil/musico/${dadosMusico.id_musico}`;
        await dadosUsuario.save({ fields: ['link_perfil'] });

        if (toco) {
            // Inserindo id_instrumento na tabela intermediária
            await MusicoInstrumentos.create({
                id_musico: dadosMusico.id_musico,
                id_instrumento
            });
        }

        if (tecnico) {
            // Inserindo id_tecnico na tabela intermediária
            await MusicoTecnicos.create({
                id_musico: dadosMusico.id_musico,
                id_tecnico
            });
        }

        // Setar session do usuario
        let usuario = { id_usuario: dadosUsuario.id_usuario, nome, senha, email, avatar: dadosUsuario.avatar, id_tipos_perfil: 1, admin: dadosUsuario.admin};

        req.session.usuario = usuario;

        res.redirect('/home');

    }
}

module.exports = cadastroMuicoController;
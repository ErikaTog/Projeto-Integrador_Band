const { Cidade, Usuario, Musico } = require('../models');
const bcrypt = require('bcrypt');

const cadastroMuicoController = {
    formMusician: (req, res) => {
        return res.render('form-musico');
    },
    saveMusician: async (req, res) => {
        let { nome, senha, email, sexo, sobre, estado, cidade, site, canal, canto, toco, tecnico, instrumento, habilidadeTecnica } = req.body;
        // console.log(user, password, email, gender, bio, estado, cidade, site, canal, canto, toco, tecnico, instrument, techinicalSkill)
        
        senha = bcrypt.hashSync(senha, 10);
        
        // Buscando o id da Cidade e do Estado na tabela cidade
        const findIdCidade = await Cidade.findOne({ where: { nome: cidade } })
        
        const idCidade = findIdCidade.dataValues.id_cidade;
        const idEstado = findIdCidade.dataValues.id_estado;

        // Inserindo informação na tabela usuario   
        const dadosUsuario = await Usuario.create({
            nome,
            email,
            senha,
            data_cadastro: new Date(),
            id_cidade: idCidade,
            id_estado: idEstado,
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

        res.redirect('/feed');
    }
}

module.exports = cadastroMuicoController;
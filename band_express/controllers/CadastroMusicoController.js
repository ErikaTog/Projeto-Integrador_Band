const { Estado, Cidade, Usuario, Musico } = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const cadastroMuicoController = {
    formMusician: (req, res) => {
        return res.render('form-musico');
    },
    validations: (req, res) => {
        // check('nome')
        //     .isEmpty().withMessage('Esse campo não pode ser vazio')
        //     .isLength({ min: 2, max:100 }).withMessage('Esse campo deve ter entre 2 a 100 caracteres')
        //     .custom(async (value, { req }) => {
        //         let user = await Usuario.findOne({ nome: value });
            
        //         if (!_.isEmpty(user)) {
        //           return false;
        //         }
        //       })
        //       .withMessage("Este usuário já existe")
        
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.render('form-musico', { errors: errors.errors });
        }
    },
    saveMusician: async (req, res) => {

        let { nome, senha, email, sexo, sobre, estado, cidade, site, canal, canto, toco, tecnico, instrumento, habilidadeTecnica } = req.body;
        // console.log(user, password, email, gender, bio, estado, cidade, site, canal, canto, toco, tecnico, instrument, techinicalSkill)
        
        senha = bcrypt.hashSync(senha, 10);
        
        // Buscando o id da Cidade na tabela cidade
        const findIdCidade = await Cidade.findOne({ where: { nome: cidade } })
        
        const idCidade = findIdCidade.dataValues.id_cidade;

        // Buscando o id do Estado na tabela estado
        const findIdEstado = await Estado.findOne({ where: { nome: estado } })

        const idEstado = findIdEstado.dataValues.id_estado;

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
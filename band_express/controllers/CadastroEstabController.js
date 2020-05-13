const Sequelize = require ('sequelize');
const config = require ('../config/database');
const {Usuario, Estabelecimento, Funcionamento} = require('../models');
const bcrypt = require('bcrypt');

const cadastroEstabController = {
    formEstab: (req, res) => {
        return res.render('form-estab');
    },
    saveEstab: async(req, res) => {
        let { nome, senha, email, tipoLocal, sobre, estado, 
            cidade, site, emailEstab, telefone, funcionamento } = req.body;

        //let hashPassword = bcrypt.hashSync(senha, 10);

        const novoEstab = await Usuario.create({
            nome: 'teste',
            email: 'a@gmail.com',
            senha: '23234', 
            data_cadastro: 123,
            admin: 0,
            avatar: 'teste',
            wallpaper: 'teste',
            link_perfil: 'teste',
            perfil_id_perfil: 3
        });    
    }
}

module.exports = cadastroEstabController;
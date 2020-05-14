const Sequelize = require('sequelize');
const config = require('../config/database');
const {
    Usuario,
    Banda,
    BandaIntegrantes
} = require('../models')


const cadastroController = {
    pre: (req, res) => {
        return res.render('pre-cadastro')
    },

    formBanda: (req, res) => {
        return res.render('form-banda');
    },

    saveBanda: async (req, res) => {
        const { nome, email, senha, genero, sobre, estado, cidade, site, canal, emailBanda, integrante, funcao} = req.body;

        console.log(req.body)
    }   
       
}

module.exports = cadastroController;
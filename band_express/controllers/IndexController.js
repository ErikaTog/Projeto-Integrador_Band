const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {Usuario} = require('../models')

const indexController = {
    view: (req, res) => {
        return res.render('index')
    },

    loginUsuario: async (req, res) => {
        try{
             //lendo informações do body
        const {email, senha} = req.body;

        // buscando o email informado
        const usuario = await Usuario.findOne({
            attributes: ['nome', 'email', 'senha'],
            raw: true,
            where: {
                email
            }
        })

        // verificando se existe o usuário com o email informado
        if (!usuario) {
            res.redirect("/?error=1")
        }

        // validando senha
        if (!bcrypt.compareSync(senha, usuario.senha)){
            res.redirect("/?error=1")
        }

        req.session.usuario = usuario;

        res.redirect('/home')
        }
        catch(error){console.log(error)};
    }
}

module.exports = indexController;
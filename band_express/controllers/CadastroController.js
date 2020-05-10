const Sequelize = require ('sequelize');
const config = require ('../config/database');

const cadastroController = {
    pre:(req, res)=>{
       return res.render('pre-cadastro')
    },
    formBanda:(req, res)=>{
        return res.render('form-banda');
    }

}

module.exports = cadastroController;
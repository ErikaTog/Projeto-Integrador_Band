const Sequelize = require ('sequelize');
const config = require ('../config/database');

const cadastroController = {
    pre:(req, res)=>{
       return res.render('pre-cadastro')
    },
    formBanda:(req, res)=>{
        return res.render('form-banda');
    },
    saveBanda:(req, res)=>{
        //fazer desestruturação let {} = req.body
        //salvar no banco
        //res.redirect('/rotafeed');
        //console.log(req.body);
    }
    //feed:(req, res) =>{
        //return res.render('feed');}
}

module.exports = cadastroController;
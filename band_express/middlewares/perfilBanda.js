const { validationResult } = require('express-validator');
const {Banda} = require('../models')

const perfilBanda = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        //Selecionando o id da banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda'],
            where: {
                id_usuario: req.session.usuario.id_usuario
            }    
        })
  
        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect(`/perfil/banda`)
            return 
        } 

        next();
    }
}

module.exports = perfilBanda;
    


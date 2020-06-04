const { validationResult } = require('express-validator');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado, Minha_rede, Audio, Video} = require('../models')

const perfilEditarBanda = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/perfil/editar/banda')
            return 
        } 

        next();
    }
}

       
module.exports = perfilEditarBanda;
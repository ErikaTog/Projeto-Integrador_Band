const { validationResult } = require('express-validator');
const { Cidade, Estado, Usuario, Musico, MusicoInstrumentos, Instrumento, MusicoTecnicos, Tecnico, Minha_rede, Audio, Video } = require('../models');

const perfilEditarMusico = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)
        
        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/perfil/editar/musico')
            return 
        } 

        next();
    }
}

module.exports = perfilEditarMusico;
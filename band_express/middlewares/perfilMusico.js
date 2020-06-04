const { validationResult } = require('express-validator');
const { Musico } = require('../models');

const perfilMusico = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            const dadosMusico = await Musico.findOne({ 
                where: { id_usuario: req.session.usuario.id_usuario },
                raw: true,
                attributes: ['id_musico'] 
            });

            req.flash('errorValidator', errors);
            res.redirect(`/perfil/musico/${dadosMusico.id_musico}`);
            return
        } 

        next();
    }
}

module.exports = perfilMusico;
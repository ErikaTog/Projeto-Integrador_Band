const { validationResult } = require('express-validator');

const perfilEditarEstab = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/perfil/editar/estabelecimento')
            return 
        } 
        next();
    }
}

module.exports = perfilEditarEstab;
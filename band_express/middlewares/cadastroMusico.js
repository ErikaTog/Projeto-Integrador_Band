const { validationResult } = require('express-validator');

const Musico = {
    error: (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/cadastro/musico');
            return
        } 

        next();
    }
}

module.exports = Musico;
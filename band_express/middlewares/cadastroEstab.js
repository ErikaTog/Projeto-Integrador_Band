const { validationResult } = require('express-validator');

const Estabelecimento = {
    error: (req, res, next) => {
        let errors = validationResult(req).array({onlyFirstError: true});
        console.log(errors)

        if (errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/cadastro/estabelecimento');
            return
        }

        next();
    }  
} 

module.exports = Estabelecimento;
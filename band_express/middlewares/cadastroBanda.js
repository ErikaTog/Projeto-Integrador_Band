const { validationResult } = require('express-validator');

const Banda = {
    error: (req, res, next) => {
        let errors = validationResult(req).array({onlyFirstError: true});
        console.log(errors)

        if (errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/cadastro/banda');
            return
        }

        next();
    }  
} 

module.exports = Banda;


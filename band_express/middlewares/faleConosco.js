const { validationResult } = require('express-validator');

const FaleConosco = {
    error: (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/faleConosco');
            return
        } 

        next();
    }
}

module.exports = FaleConosco;
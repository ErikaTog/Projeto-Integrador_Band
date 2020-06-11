const { validationResult } = require('express-validator');

const excluirConta = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/remover')
            return 
        } 
        next();
    }
}

module.exports = excluirConta;
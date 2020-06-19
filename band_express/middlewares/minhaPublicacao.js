const { validationResult } = require('express-validator');

const home = {
    errorComentario: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)
        
        if(errors.length) {
            req.flash('errorValidator', errors);
            res.redirect('/minhaPublicacao')
            return 
        } 

        next();
    }
}

module.exports = home;
const { validationResult } = require('express-validator');

const Musico = {
    error: (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        if(errors.length) {
            return res.render('form-musico', { errors: errors });
        } 

        next();
    }
}

module.exports = Musico;
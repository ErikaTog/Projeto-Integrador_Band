const { validationResult } = require('express-validator');

const Banda = {
    error: (req, res, next) => {
        let listaDeErros = validationResult(req).array({onlyFirstError: true});
        console.log(listaDeErros)

        if (listaDeErros.length) {
            return res.render('form-banda', {errors: listaDeErros})
        }

        next();
    }  
} 

module.exports = Banda;


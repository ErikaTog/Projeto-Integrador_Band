const { validationResult } = require('express-validator');

const Estabelecimento = {
    error: (req, res, next) => {
        let listaDeErros = validationResult(req).array({onlyFirstError: true});
        console.log(listaDeErros)

        if (listaDeErros.length) {
            return res.render('form-estab', {errors: listaDeErros})
        }

        next();
    }  
} 

module.exports = Estabelecimento;
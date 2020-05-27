const { validationResult } = require('express-validator');
const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEditarEstab = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        

        next();
    }
}

module.exports = perfilEditarEstab;
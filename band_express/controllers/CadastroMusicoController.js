const Musico = require('../models/Musico');

const cadastroMuicoController = {
    formMusician: (req, res) => {
        return res.render('form-musico');
    },
    saveMusician: (req, res) => {
        Musico.create({
            
        })
    }
}

module.exports = cadastroMuicoController;
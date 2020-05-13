const {Usuario, Estabelecimento, Funcionamento} = require('../models')

const cadastroEstabController = {
    formEstab: (req, res) => {
        return res.render('form-estab');
    },
    saveEstab: async(req, res) => {
        return res.render('form-estab');
    }
}

module.exports = cadastroEstabController;
const vagasController = {

    view: (req, res) => {
        return res.render('vagas', { title: 'Vagas', usuario: req.session.usuario})
    }
}

module.exports = vagasController;

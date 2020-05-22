const perfilBandaController = {
    show: (req, res) => {
        res.render('perfil-banda', { title: 'Perfil', usuario: req.session.usuario });
    }
}

module.exports = perfilBandaController;
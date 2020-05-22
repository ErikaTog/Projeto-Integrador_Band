
const perfilEstabController = {
    show: (req, res) => {
        res.render('perfil-estab', { title: 'Perfil', usuario: req.session.usuario });
    }
}

module.exports = perfilEstabController;
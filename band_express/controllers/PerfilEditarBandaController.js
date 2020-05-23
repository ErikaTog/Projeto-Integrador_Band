
const perfilEditarBandaController = {
    show: (req, res) => {
        res.render('perfil-banda-editar', { title: 'Perfil-editar', usuario: req.session.usuario });
    }
}

module.exports = perfilEditarBandaController;
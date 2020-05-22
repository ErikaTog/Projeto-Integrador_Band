
const perfilEditarEstabController = {
    show: (req, res) => {
        res.render('perfil-estab-editar', { title: 'Perfil-editar', usuario: req.session.usuario });
    }
}

module.exports = perfilEditarEstabController;
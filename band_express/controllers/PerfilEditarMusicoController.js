
const perfilEditarMusicoController = {
    show: (req, res) => {
        res.render('perfil-musico-editar', { title: 'Perfil-editar', usuario: req.session.usuario });
    }
}

module.exports = perfilEditarMusicoController;
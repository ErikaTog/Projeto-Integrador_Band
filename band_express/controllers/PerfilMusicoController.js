
const perfilMusicoController = {
    show: (req, res) => {
        res.render('perfil-musico', { title: 'Perfil', usuario: req.session.usuario });
    }
}

module.exports = perfilMusicoController;
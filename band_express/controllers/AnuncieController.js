
const anuncieController = {
    show: (req, res) => {
        res.render('anuncie', { title: 'Anuncie', usuario: req.session.usuario })
    }
}

module.exports = anuncieController;
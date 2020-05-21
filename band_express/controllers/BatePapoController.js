
const batePapoController = {
    show: (req, res) => {
        res.render('bate-papo', { title: 'Bate papo', usuario: req.session.usuario })
    }
}

module.exports = batePapoController;
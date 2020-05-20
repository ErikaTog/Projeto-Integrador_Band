const homeController = {
    view: (req, res) => {
        return res.render('feed', { usuario: req.session.usuario });
    }
} 

module.exports = homeController;
const homeController = {
    view: (req, res) => {
        return res.render('feed', { title: 'Home', usuario: req.session.usuario });
    }
} 

module.exports = homeController;
const faleConoscoController = {
    view: (req, res) => {
    return res.render('fale-conosco', { title: 'Fale Conosco', usuario: req.session.usuario });
    }
} 

module.exports = faleConoscoController;
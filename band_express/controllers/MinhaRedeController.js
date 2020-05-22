const minhaRedeController = {

    view: (req, res) => {
        return res.render('minhaRede', { title: 'Minha Rede', usuario: req.session.usuario})
    }
}

module.exports = minhaRedeController;

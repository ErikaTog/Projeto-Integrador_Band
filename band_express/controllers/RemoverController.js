const removerController = {
    view: async (req, res) => {

        return res.render('remover', { title: 'Gerenciar', usuario: req.session.usuario });
        
    }
} 

module.exports = removerController;
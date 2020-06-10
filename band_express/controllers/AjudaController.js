const ajudaController = {
    view: async (req, res) => {

        return res.render('ajuda', { title: 'Ajuda', usuario: req.session.usuario });
        
    }
} 

module.exports = ajudaController;
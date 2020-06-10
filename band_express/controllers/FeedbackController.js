const { } = require('../models');

const feedbackController = {
    view: async (req, res) => {

        return res.render('feedback', { title: 'Band+', usuario: req.session.usuario });
    }
} 

module.exports = feedbackController;
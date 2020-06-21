const { Fale_conosco } = require('../models');

const adminController = {
    show: async (req, res) => {

        // Burcar Usuários
        const faleConosco = await Fale_conosco.findAll({
            raw: true,
            attributes: ['id_fale_conosco', 'nome', 'email', 'assunto', 'mensagem', 'resolvido'],
            limit: 10,
            order: [['id_fale_conosco', 'ASC']]
        })

        return res.render('admin-fale-conosco', { 
            usuario: req.session.usuario,
            faleConosco
        });
    },
    saveCheck: async (req, res) => {
        const idMsg = await Fale_conosco.findOne({ where: { id_fale_conosco: req.params.id }});

        idMsg.resolvido = 1;

        console.log(idMsg.resolvido)

        await idMsg.save({ fields: ['resolvido'] });

        return
    },
    deleteMsg: async (req, res) => {
        await Fale_conosco.destroy({
            where: { id_fale_conosco: req.params.id }
        });

        return
    },
    loadMsg: async (req, res) => {
        const { page } = req.params;

        const limit = 5;

        const msg = await Fale_conosco.findAll({
            raw: true,
            attributes: ['id_fale_conosco', 'nome', 'email', 'assunto', 'mensagem', 'resolvido'],
            offset: (limit * page),
            limit,
            order: [['id_fale_conosco', 'ASC']]
        })

        return res.send(msg);
    },
} 

module.exports = adminController;
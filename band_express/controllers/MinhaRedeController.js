const { Musico, Banda, Estabelecimento } = require('../models');

const minhaRedeController = {
    view: async (req, res) => {

        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico'] 
        });

        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda'],
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab'] 
        });

        return res.render('minhaRede', { title: 'Minha Rede', usuario: req.session.usuario, dadosMusico, dadosBanda, dadosEstab })
    }
}

module.exports = minhaRedeController;

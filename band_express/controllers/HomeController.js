const { Musico, Banda, Estabelecimento } = require('../models');

const homeController = {
    view: async (req, res) => {
        const dadosMusico = await Musico.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_musico', 'sobre', 'site', 'canal', 'canto', 'toco', 'tecnico'] 
        });

        //Selecionando os dados da banda
        const dadosBanda = await Banda.findOne({
            raw: true,
            attributes: ['id_banda', 'genero', 'sobre', 'site', 'canal'],
            where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });

        //Dados Estabelecimento
        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab'] 
        });

        return res.render('feed', { title: 'Home', usuario: req.session.usuario, dadosMusico, dadosBanda, dadosEstab });
    }
} 

module.exports = homeController;
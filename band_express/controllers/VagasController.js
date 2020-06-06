const { Usuario, Cidade, Estado, Musico, Banda, Estabelecimento, Vagas } = require('../models'); 

const vagasController = {

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

        const dadosVagas = await Vagas.findAll({ 
            where: { },
            raw: true,
            attributes: ['id_vagas', 'titulo', 'descricao', 'local', 'tipo_vaga', 'id_usuario', 'usuario.nome', 'usuario.cidade.cidade', 'usuario.cidade.estado.uf'],
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: [],
                include: [{
                    model: Cidade,
                    as: 'cidade',
                    attributes: [],
                    include: [{
                        model: Estado,
                        as: 'estado',
                        attributes: [],
                    }]
                }] 
            }]
        });

        res.render('vagas', { 
            title: 'Vagas',
            dadosMusico,
            dadosBanda,
            dadosEstab,
            dadosVagas,
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });
            
    }
}

module.exports = vagasController;

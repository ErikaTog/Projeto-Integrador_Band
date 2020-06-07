const { Usuario, Cidade, Estado, Musico, Banda, Estabelecimento, Vagas } = require('../models'); 

const vagasController = {

    show: async (req, res) => {
        
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

        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
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
            estados,
            dadosMusico,
            dadosBanda,
            dadosEstab,
            dadosVagas,
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });    
    },

    novaVaga: async (req, res) => {
        let { tipoVaga, tituloNovaVaga, estado, cidade, descricaoNovaVaga } = req.body;

        tituloNovaVaga = tituloNovaVaga.trim();
        descricaoNovaVaga = descricaoNovaVaga.trim();
        cidade = cidade.trim();

        const dadosNovaVaga = await Vagas.create({
			titulo: tituloNovaVaga,
			descricao: descricaoNovaVaga,
			local: cidade + " / " + estado,
            tipo_vaga: tipoVaga,
            id_usuario: req.session.usuario.id_usuario
		})

		return res.redirect('/home')
    }
}

module.exports = vagasController;

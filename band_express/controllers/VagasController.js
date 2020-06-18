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
            where: { id_usuario: req.session.usuario.id_usuario }
        });

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab'] 
        });

        // Buscar todos os estados
		const estados = await Estado.findAll({ 
        	raw: true
		});
		// Buscar todas as cidades
		const cidades = await Cidade.findAll({ 
        	raw: true
        });

        const dadosVagas = await Vagas.findAll({ 
            where: { },
            raw: true,
            attributes: ['id_vagas', 'titulo', 'descricao', 'cidade_vaga', 'estado_vaga', 'tipo_vaga', 'id_usuario', 'usuario.nome'],
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

        const dadosMinhasVagas = await Vagas.findAll({ 
            where: { 
                id_usuario: req.session.usuario.id_usuario
            },
            raw: true,
            attributes: ['id_vagas', 'titulo', 'descricao', 'cidade_vaga', 'estado_vaga', 'tipo_vaga', 'id_usuario', 'usuario.nome'],
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
            cidades,
            dadosMusico,
            dadosBanda,
            dadosEstab,
            dadosVagas,
            dadosMinhasVagas,
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });    
    },

    novaVaga: async (req, res) => {
        let { tipoVaga, tituloNovaVaga, estado: id_estado, 
			cidade: id_cidade, descricaoNovaVaga } = req.body;

        tituloNovaVaga = tituloNovaVaga.trim();
        descricaoNovaVaga = descricaoNovaVaga.trim();

        const cidade = await Cidade.findOne({ 
            where: { id_cidade: id_cidade },
            raw: true,
            attributes: ['cidade'] 
        });
        console.log(cidade)
        const estado = await Estado.findOne({ 
            where: { id_estado: id_estado },
            raw: true,
            attributes: ['uf'] 
        });
        console.log(estado)
        const dadosNovaVaga = await Vagas.create({
			titulo: tituloNovaVaga,
			descricao: descricaoNovaVaga,
            cidade_vaga: cidade.cidade, 
            estado_vaga: estado.uf,
            tipo_vaga: tipoVaga,
            id_usuario: req.session.usuario.id_usuario
		})

		res.redirect(`/vagas`);
    },

    editarVaga: async (req, res) => {
        res.redirect(`/vagas`);
    },
    
    dadosFeed: async (req, res) => {

        let limite = req.body;
        limite.valor = limite.valor + 4;

        const pagina = await Vagas.findAll({
            limit: limite.valor,
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome'],
            }]
        });

        res.json({
            pagina,
            limite: pagina.length
        });
    },

    dadosMinhasVagas: async (req, res) => {

        let limite = req.body;
        limite.valor = limite.valor + 4;

        const pagina = await Vagas.findAll({
            where: { 
                id_usuario: req.session.usuario.id_usuario 
            },
            limit: limite.valor,
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome'],
            }]
        });
        console.log(pagina)

        res.json({
            pagina,
            limite: pagina.length
        });
        
    }
}

module.exports = vagasController;
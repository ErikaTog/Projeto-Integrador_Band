const { Usuario, Cidade, Estado, Musico, Banda, Estabelecimento, Anuncie } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require("fs");
// const { Console } = require('console');

const anuncieController = {
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

        res.render('anuncie', { 
            title: 'Anuncie',
            estados,
            cidades,
            dadosMusico,
            dadosBanda,
            dadosEstab,
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });   
    },

    novoProduto: async (req, res) => {

        let { tituloNovoProduto, estado: id_estado, 
            cidade: id_cidade, dinheiro, descricaoNovoProduto } = req.body;
        
        tituloNovoProduto = tituloNovoProduto.trim();
        descricaoNovoProduto = descricaoNovoProduto.trim();

        const cidade = await Cidade.findOne({ 
            where: { id_cidade: id_cidade },
            raw: true,
            attributes: ['cidade'] 
        });
        
        const estado = await Estado.findOne({ 
            where: { id_estado: id_estado },
            raw: true,
            attributes: ['uf'] 
        });
        
        const dadosNovoProduto = await Anuncie.create({
            titulo: tituloNovoProduto,
            descricao: descricaoNovoProduto,
            cidade_vaga: cidade.cidade, 
            estado_vaga: estado.uf,
            valor: dinheiro,
            img_anuncio: '/img/imgEditar.png',
            id_usuario: req.session.usuario.id_usuario
        })

        let file = req.files[0].filename;
        if(file.includes(".jpg") || file.includes(".png") || 
            file.includes(".gif") || file.includes(".tiff")){

            const imgBd = await Anuncie.findOne({
                where: { id_anuncie: dadosNovoProduto.dataValues.id_anuncie }
            });

            const cutPath = imgBd.img_anuncio.slice(13) 

            if (imgBd.img_anuncio != '/img/imgEditar.png') {
                fs.unlinkSync(`./public/img/uploads/${cutPath}`);
            }

            const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;
            imgBd.img_anuncio = pathFile;

            await imgBd.save({ fields: ['img_anuncio'] });

        }

		res.redirect(`/anuncie`);
    },

    dadosBuscar: async (req, res) => {

        let dados = req.body;

        let busca = dados.buscarProduto;
        
        const buscaFeed = await Anuncie.findAll({
            where: { 
                [Op.or]: {
                    titulo: {[Op.like]:'%'+ busca +'%'},
                    descricao: {[Op.like]:'%'+ busca +'%'} 
                }
            },
            limit: dados.feedLimite,
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome', 'link_perfil'],
            }]
        })

        const buscaMeusProdutos = await Anuncie.findAll({
            where: { 
                id_usuario: req.session.usuario.id_usuario,
                [Op.or]: {
                    titulo: {[Op.like]:'%'+ busca +'%'},
                    descricao: {[Op.like]:'%'+ busca +'%'} 
                }
            },
            limit: dados.meusLimite,
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['nome', 'link_perfil'],
            }]
        })

        res.json({
            buscaFeed,
            buscaMeusProdutos
        });
    }
}

module.exports = anuncieController;
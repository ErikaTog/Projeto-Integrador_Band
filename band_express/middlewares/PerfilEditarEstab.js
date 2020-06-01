const { validationResult } = require('express-validator');
const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEditarEstab = {
    error: async (req, res, next) => {
        let errors = validationResult(req).array({ onlyFirstError: true });
        console.log(errors)

        // Dados da tabela Usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { 
                nome: req.session.usuario.nome 
            },
            raw: true,
            attributes: ['nome', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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
        });

        // Quantidade de pessoas que o usuario esta seguindo e que seguem ele
        const totalSeguindo = await Minha_rede.count({
			where: {
                id_usuario: req.session.usuario.id_usuario
            }
        });
        const totalSeguidores = await Minha_rede.count({
			where: {
                id_usuario_seguido: req.session.usuario.id_usuario
            }
        });

        // Dados da tabela Estabelecimento referente ao usuario
        const dadosEstab = await Estabelecimento.findOne({
			where: {
                id_usuario:  req.session.usuario.id_usuario
            },
            raw: true,
            attributes: ['id_estab', 'categoria', 'sobre', 'site', 'telefone', 'funcionamento'] 
        });

        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });

        // Busca tabela de Funcionamento
        const dadosFuncionamento = await Funcionamento.findAll({
            where: {
                id_estab: dadosEstab.id_estab
            },
            raw: true,
            attributes: ['dia', 'horario_abertura', 'horario_fechamento'] 
        });

        tipoCategoria = [ "Bar/Pub", "Escola de música", "Estúdio", "Gravadora", "Loja", "Produtora", "Restaurante", "Outro"]

        if(errors.length) {
            return res.render('perfil-estab-editar', { 
                usuario: req.session.usuario, 
                dadosUsuario,
                dadosEstab, 
                estados,
                tipoCategoria,
                dadosFuncionamento,
                totalSeguindo,
                totalSeguidores,
                mensagemNull: 'Ops, você não informou este campo',
                errors: errors 
            });
        } 

        next();
    }
}

module.exports = perfilEditarEstab;
const bcrypt = require('bcrypt');
const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEstabController = {
    show: async (req, res) => {

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

        res.render('perfil-estab', { 
            title: 'Perfil', 
            usuario: req.session.usuario, 
            dadosUsuario,
            dadosEstab, 
            estados,
            dadosFuncionamento,
            totalSeguindo,
            totalSeguidores,
            mensagemNull: 'Ops, você não informou este campo',
        });
    },

    changePassword: async (req, res) => {
        let { senhaNova } = req.body;
        
        senhaNova = bcrypt.hashSync(senhaNova, 10);

        const senhaBD = await Usuario.findOne({ where: { id_usuario: req.session.usuario.id_usuario } });

        senhaBD.senha = senhaNova;

        await senhaBD.save({ fields: ['senha'] });

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab'] 
        });

        res.redirect(`/perfil/estabelecimento/${dadosEstab.id_estab}`);
    }

}

module.exports = perfilEstabController;
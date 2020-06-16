const bcrypt = require('bcrypt');
const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEstabController = {
    showUser: async (req, res) => {
        try {  
            // let id_usuario = req.session.usuario.id_usuario
            // Dados da tabela Usuario
            const dadosUsuario = await Usuario.findOne({ 
                where: { 
                    id_usuario: req.session.usuario.id_usuario 
                },
                raw: true,
                attributes: ['id_usuario', 'nome', 'email', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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
                dadosFuncionamento = await Funcionamento.findAll({
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

        } catch (error) {
            return res.redirect('/home');
        }   
    },

    show: async (req, res) => {

        try {

            // Dados da tabela Estabelecimento referente ao usuario
            const dadosEstab = await Estabelecimento.findOne({
                where: {
                    id_estab: req.params.id 
                },
                raw: true,
                attributes: ['id_usuario', 'id_estab', 'categoria', 'sobre', 'site', 'telefone', 'funcionamento'] 
            });

            // Dados da tabela Usuario
            const dadosUsuario = await Usuario.findOne({ 
                where: { 
                    id_usuario: dadosEstab.id_usuario
                },
                raw: true,
                attributes: ['id_usuario', 'nome', 'email', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf'],
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
                    id_usuario: dadosUsuario.id_usuario
                }
            });
            const totalSeguidores = await Minha_rede.count({
                where: {
                    id_usuario_seguido: dadosUsuario.id_usuario
                }
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
                mensagemNull: 'Dados não preenchidos',
            });

        } catch (error) {
            // Quando o usuário digita um id_musico (req_params) que não existe
            return res.status(404);
        }
        
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
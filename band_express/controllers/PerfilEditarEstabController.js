const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEditarEstabController = {
    show: async (req, res) => {

        // Dados da tabela Usuario
        const dadosUsuario = await Usuario.findOne({ 
            where: { 
                nome: req.session.usuario.nome 
            },
            raw: true,
            attributes: ['nome', 'avatar', 'wallpaper', 'cidade.nome', 'cidade.estado.uf'],
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
            attributes: ['id_estab', 'categoria', 'sobre', 'site', 'servicos', 'telefone', 'funcionamento'] 
        });

        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });

        // Tratamento dos dados da tabela Funcionamento
        let dadosFunc = [];
        if(dadosEstab.funcionamento){
            // Dados da tabela Funcionamento referente ao usuario
            const dadosFuncionamento = await Funcionamento.findAll({
                where: {
                    id_estab: dadosEstab.id_estab
                }
            });
            for (let i = 0; i < dadosFuncionamento.length; i++) {
                dadosFunc[i] = { 
                    dia: dadosFuncionamento[i].dataValues.dia,
                    horario_abertura: dadosFuncionamento[i].dataValues.horario_abertura,
                    horario_fechamento: dadosFuncionamento[i].dataValues.horario_fechamento
                };
            }
        }

        tipoCategoria = [ "Bar/Pub", "Escola de música", "Estúdio", "Gravadora", "Loja", "Produtora", "Restaurante", "Outro"]

        res.render('perfil-estab-editar', { 
            usuario: req.session.usuario, 
            dadosUsuario,
            dadosEstab, 
            estados,
            tipoCategoria,
            dadosFunc,
            totalSeguindo,
            totalSeguidores,
            mensagemNull: 'Ops, você não informou este campo',
        });
    },

    change: async (req, res) => {

        let { nome, sobre, estado, cidade, site, servicos, categoria } = req.body;

        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
        });
        
        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }, 
        });
        
        // Buscar o id_cidade e id_estado na tabela cidade
        const findIdLocal = await Cidade.findOne({
            where: { nome: cidade },
            raw: true,
            attributes: ['id_cidade', 'estado.id_estado'],
            include: [{
                model: Estado, 
                as: 'estado',
                attributes: [],
                where: { uf: estado }
            }]
        });

        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.id_estado = findIdLocal.id_estado;
        dadosUsuario.id_cidade = findIdLocal.id_cidade;
        dadosEstab.sobre = sobre;
        dadosEstab.site = site;
        dadosEstab.servicos = servicos;
        dadosEstab.categoria = categoria;

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'id_cidade', 'id_estado'] });
        await dadosEstab.save({ fields: ['sobre', 'site', 'servicos', 'categoria'] });

        // Setar session do usuario
        let usuario = { 
            id_usuario: dadosUsuario.id_usuario, 
            nome: dadosUsuario.nome, 
            senha: dadosUsuario.senha, 
            email: req.session.usuario.email,
            id_tipos_perfil: 3
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect(`/perfil/estabelecimento/${dadosEstab.id_estab}`);

    }
}

module.exports = perfilEditarEstabController;
const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEditarEstabController = {
    show: async (req, res) => {

        let id_usuario = req.session.usuario.id_usuario

        // Dados da tabela Usuario
        const dadosUsuario = await Usuario.findAll({
			where: {
                id_usuario: id_usuario
            }
        });

        // Quantidade de pessoas que o usuario esta seguindo e que seguem ele
        const totalSeguindo = await Minha_rede.count({
			where: {
                id_usuario: id_usuario
            }
        });
        const totalSeguidores = await Minha_rede.count({
			where: {
                id_usuario_seguido: id_usuario
            }
        });

        // Dados da tabela Estabelecimento referente ao usuario
        const dadosEstab = await Estabelecimento.findAll({
			where: {
                id_usuario: id_usuario
            }
        });

        // Dados da tabela Cidade/Estado referente ao usuario
        const nomeCidade = await Cidade.findAll({
            where: {
                id_cidade: dadosUsuario[0].dataValues.id_cidade
            }
        })
        const nomeEstado = await Estado.findAll({
            where: {
                id_estado: dadosUsuario[0].dataValues.id_estado
            }
        })

        // Buscar lista de Estados
        const estados = await Estado.findAll({ 
            raw: true,
            attributes: ['uf'] 
        });

        // Tratamento dos dados da tabela Funcionamento
        let dadosFunc = [];
        if(dadosEstab[0].dataValues.funcionamento){
            // Dados da tabela Funcionamento referente ao usuario
            const dadosFuncionamento = await Funcionamento.findAll({
                where: {
                    id_estab: dadosEstab[0].dataValues.id_estab
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

        let dadosView = {
            avatar: dadosUsuario[0].dataValues.avatar,
            wallpaper: dadosUsuario[0].dataValues.wallpaper,
            totalSeguindo,
            totalSeguidores,
            id_estab: dadosEstab[0].dataValues.id_estab,
            categoria: dadosEstab[0].dataValues.categoria,
            cidade: nomeCidade[0].dataValues.nome,
            estado: nomeEstado[0].dataValues.uf,
            site: dadosEstab[0].dataValues.site,
            servicos: dadosEstab[0].dataValues.servicos,
            sobre: dadosEstab[0].dataValues.sobre,
            funcionamento: dadosEstab[0].dataValues.funcionamento,
            mensagemNull: 'Ops, você não informou este campo',
            dadosFunc
        }

        res.render('perfil-estab-editar', { 
            title: 'Perfil-editar', 
            usuario: req.session.usuario, 
            dadosUsuario,
            estados,
            dadosEstab, 
            dadosView
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
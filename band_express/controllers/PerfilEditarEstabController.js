const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 
const fs = require("fs");

const perfilEditarEstabController = {
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

        tipoCategoria = [ "Bar/Pub", "Escola de música", "Estúdio", "Gravadora", "Loja", "Produtora", "Restaurante", "Outro"]

        res.render('perfil-estab-editar', { 
            usuario: req.session.usuario, 
            dadosUsuario,
            dadosEstab, 
            estados,
            tipoCategoria,
            dadosFuncionamento,
            totalSeguindo,
            totalSeguidores,
            mensagemNull: 'Ops, você não informou este campo',
        });
    },

    change: async (req, res) => {

        let { nome, sobre, estado, cidade, site, categoria, telefone, inputDia, inputAbertura, inputFechamento } = req.body;
    
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
        });
        
        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }, 
        });
        
        // Buscar o id_cidade e id_estado na tabela cidade
        const findIdLocal = await Cidade.findOne({
            where: { cidade: cidade },
            raw: true,
            attributes: ['id_cidade', 'estado.id_estado'],
            include: [{
                model: Estado, 
                as: 'estado',
                attributes: [],
                where: { uf: estado }
            }]
        });

        if(telefone.length == 14){
			telefone = telefone.replace("-","");
			telefone = telefone.substr(0,9) + "-" + telefone.substr(9);
		}

        // Guardando os valores de funcionamento no banco de dados
        if(dadosEstab.funcionamento){
            for (let valor of inputDia){
                const dadosFunc = await Funcionamento.findOne({
                    where: {
                        id_estab: dadosEstab.id_estab,
                        dia: valor
                    }
                });
                let index = inputDia.indexOf(valor);
                dadosFunc.horario_abertura = inputAbertura[index];
                dadosFunc.horario_fechamento = inputFechamento[index];
                console.log(dadosFunc)
                await dadosFunc.save({ fields: ['horario_abertura', 'horario_fechamento'] });
            }
        }
        
        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.id_estado = findIdLocal.id_estado;
        dadosUsuario.id_cidade = findIdLocal.id_cidade;
        dadosEstab.sobre = sobre;
        dadosEstab.site = site;
        dadosEstab.categoria = categoria;
        !telefone == "" ? dadosEstab.telefone = telefone: '';

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'id_cidade', 'id_estado'] });
        await dadosEstab.save({ fields: ['sobre', 'site', 'categoria', 'telefone'] });

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

    },

    changeAvatar: async (req, res, next) => {
        
        // Excluir os arquivos de imagem da pasta avatars
        

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.avatar = pathFile;

        await dadosUsuario.save({ fields: ['avatar'] });

        // Renderiza perfil editar

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab']
        });

        res.redirect(`/perfil/editar/estabelecimento`);
    },

    changeWallpaper: async (req, res, next) => {
        
        // Excluir os arquivos de imagem da pasta avatars
        

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.wallpaper = pathFile;

        await dadosUsuario.save({ fields: ['wallpaper'] });

        // Renderiza perfil editar

        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario },
            raw: true,
            attributes: ['id_estab']
        });

        res.redirect(`/perfil/editar/estabelecimento`);
    }
}

module.exports = perfilEditarEstabController;
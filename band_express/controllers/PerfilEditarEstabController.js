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
            attributes: ['nome', 'avatar', 'wallpaper', 'cidade.cidade', 'cidade.estado.uf', 'id_usuario'],
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
            raw: true
        });

        // Buscar todas as cidades
        const cidades = await Cidade.findAll({ 
            raw: true
        });

        // Buscar as cidas do estado do Usuário
        const cidadesUsuario = await Cidade.findAll({
            raw: true,
            where: { cidade: dadosUsuario.cidade }
        })

        let dadosFuncionamento = [];
        if(dadosEstab.funcionamento){
            // Busca tabela de Funcionamento
            dadosFuncionamento = await Funcionamento.findAll({
                where: {
                    id_estab: dadosEstab.id_estab
                },
                raw: true,
                attributes: ['dia', 'horario_abertura', 'horario_fechamento'] 
            });
        };

        tipoCategoria = [ "Bar/Pub", "Escola de música", "Estúdio", "Gravadora", "Loja", "Produtora", "Restaurante", "Outro"]

        res.render('perfil-estab-editar', { 
            usuario: req.session.usuario, 
            dadosUsuario,
            dadosEstab, 
            estados,
            cidades,
            cidadesUsuario,
            tipoCategoria,
            dadosFuncionamento,
            totalSeguindo,
            totalSeguidores,
            errors: req.flash('errorValidator'),
            errorsImage: req.flash('errorImage'),
            mensagemNull: 'Ops, você não informou este campo',
        });
    },

    change: async (req, res) => {

        let { nome, sobre, estado, cidade, site, categoria, telefone, horarioSemana, diaSemana } = req.body;

        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome },
        });
        
        const dadosEstab = await Estabelecimento.findOne({ 
            where: { id_usuario: req.session.usuario.id_usuario }, 
        });

        if(telefone.length == 14){
			telefone = telefone.replace("-","");
			telefone = telefone.substr(0,9) + "-" + telefone.substr(9);
		}

        const apagaFuncionamento = await Funcionamento.destroy({
            where: {
                id_estab: dadosEstab.id_estab
            }
        });

        (horarioSemana == undefined) ? dadosEstab.funcionamento = 0 : dadosEstab.funcionamento = 1 ;

		if (dadosEstab.funcionamento){
			(horarioSemana[6] == '-') ? lengthDia = 1 : lengthDia = diaSemana.length;
			for (let i = 0; i < lengthDia; i++){
				if (horarioSemana[6] == '-') { 
					dia = diaSemana
					horario_abertura = horarioSemana.split(' ')[0]
					horario_fechamento = horarioSemana.split(' ')[2]
				} else { 
					dia = diaSemana[i]
					horario_abertura = horarioSemana[i].split(' ')[0]
					horario_fechamento = horarioSemana[i].split(' ')[2]
				}
				const dadosFuncionamento = await Funcionamento.create({
					dia,
					horario_abertura,
					horario_fechamento,
					id_estab: dadosEstab.id_estab
				});
			}
		}
        
        // Substituir valores
        dadosUsuario.nome = nome;
        dadosUsuario.id_estado = estado;
        dadosUsuario.id_cidade = cidade;
        dadosEstab.sobre = sobre;
        dadosEstab.site = site;
        dadosEstab.categoria = categoria;
        !telefone == "" ? dadosEstab.telefone = telefone: '';

        // Salvar no BD
        await dadosUsuario.save({ fields: ['nome', 'id_cidade', 'id_estado'] });
        await dadosEstab.save({ fields: ['sobre', 'site', 'categoria', 'telefone', 'funcionamento'] });

        // Setar session do usuario
        let usuario = { 
            id_usuario: dadosUsuario.id_usuario, 
            nome: dadosUsuario.nome, 
            senha: dadosUsuario.senha, 
            email: req.session.usuario.email,
            avatar: dadosUsuario.avatar,
            id_tipos_perfil: 3,
            admin: dadosUsuario.admin
        };

        req.session.usuario = usuario;

        res.cookie('logado', usuario.email, { maxAge: 900000 });
        
        res.redirect(`/feedback`);
    },

    changeAvatar: async (req, res, next) => {
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorImage', 'Para alterar a imagem do seu avatar precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
            res.redirect('/perfil/editar/estabelecimento')
            return
        }
        
        // Excluir os arquivos de imagem
        const avatarZero = "/img/avatar_zero.png";

        const avatarBd = await Usuario.findOne({
            raw: true,
            attributes: ['avatar'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = avatarBd.avatar.slice(13)    

        if (avatarBd.avatar != avatarZero) {
            fs.unlinkSync(`./public/img/uploads/${cutPath}`);
        }

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.avatar = pathFile;

        await dadosUsuario.save({ fields: ['avatar'] });

        req.session.usuario.avatar = pathFile;

        res.redirect(`/perfil/editar/estabelecimento`);
    },

    changeWallpaper: async (req, res, next) => {
        
        // Nenhum arquivo for enviado
        if (!req.files.length) {
            req.flash('errorImage', 'Para alterar a imagem do seu fundo precisamos que a imagem seja salva como arquivo JPG, PNG, GIF, ou TIFF')
            res.redirect('/perfil/editar/estabelecimento')
            return
        }
        
        // Excluir os arquivos de imagem
        const wallpaperZero = "/img/fundo_zero.png";

        const wallpaperBd = await Usuario.findOne({
            raw: true,
            attributes: ['wallpaper'],
            where: { nome: req.session.usuario.nome }
        });
             
        const cutPath = wallpaperBd.wallpaper.slice(13)    

        if (wallpaperBd.wallpaper != wallpaperZero) {
            fs.unlinkSync(`./public/img/uploads/${cutPath}`);
        }

        // Pegar o caminho do arquivo
        const pathFile = req.files[0].destination.slice(8) + '/' + req.files[0].filename;

        // Salvar no BD
        const dadosUsuario = await Usuario.findOne({ 
            where: { nome: req.session.usuario.nome }
        });

        dadosUsuario.wallpaper = pathFile;

        await dadosUsuario.save({ fields: ['wallpaper'] });

        res.redirect(`/perfil/editar/estabelecimento`);
    },

    dados: async (req, res, next) => {

        const dadosEstab = await Estabelecimento.findOne({
			where: {
                id_usuario:  req.session.usuario.id_usuario
            },
            raw: true,
            attributes: ['funcionamento', 'id_estab'] 
        });

        let dadosFuncionamento = [];
        if(dadosEstab.funcionamento){
            dadosFuncionamento = await Funcionamento.findAll({
                where: {
                    id_estab: dadosEstab.id_estab
                },
                raw: true,
                attributes: ['dia', 'horario_abertura', 'horario_fechamento'] 
            });
        };
        res.json({
            dados: dadosFuncionamento
        });
    }
}

module.exports = perfilEditarEstabController;
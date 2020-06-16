const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento } = require('../models');
const bcrypt = require('bcrypt');

const cadastroEstabController = {
	formEstab: async (req, res) => {

		// Buscar todos os estados
        const estados = await Estado.findAll({ 
        	raw: true
		});
		
        // Buscar todas as cidades
        const cidades = await Cidade.findAll({ 
        	raw: true
        });

		return res.render('form-estab', {
			estados,
			cidades,
			errors: req.flash('errorValidator')
		});
	},

	saveEstab: async (req, res) => {

		let { nome, senha, email, categoria, sobre, estado: id_estado, 
			cidade: id_cidade, site, telefone,  horarioSemana, diaSemana } = req.body;

		nome = nome.trim();
		senha = senha.trim();
		email = email.trim();
		sobre = sobre ? sobre.trim() : '';
		site = site ? site.trim() : '';

		if(telefone.length == 14){
			telefone = telefone.replace("-","");
			telefone = telefone.substr(0,9) + "-" + telefone.substr(9);
		}
		
		// Inserindo informação na tabela usuario   
		const dadosUsuario = await Usuario.create({
			nome,
			email,
			senha: bcrypt.hashSync(senha, 10),
			data_cadastro: new Date(),
			id_cidade: id_cidade,
			id_estado: id_estado,
			link_perfil: nome,
			id_tipos_perfil: 3
		})

		// Salvar o campo link_perfil
        dadosUsuario.link_perfil = `localhost:3000/perfil/estabelecimento/${dadosUsuario.id_usuario}`;
        await dadosUsuario.save({ fields: ['link_perfil'] });
		
		let funcionamento = 0;
		(diaSemana != undefined) ? funcionamento = 1 : null;

		// Inserindo dados complementares na tabela estab
		const dadosEstab = await Estabelecimento.create({
			categoria,
			sobre,
			site,
			telefone,
			funcionamento,
			id_usuario: dadosUsuario.id_usuario
		});

		
		if (funcionamento){
			(horarioSemana[0] == 0) ? lengthDia = 1 : lengthDia = diaSemana.length;
			for (let i = 0; i < lengthDia; i++){
				if (horarioSemana[0] == 0) { 
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

		// Setar session do usuario
		let usuario = { id_usuario:dadosUsuario.id_usuario , nome, senha, email, avatar: dadosUsuario.avatar, id_tipos_perfil: 3};
		req.session.usuario = usuario;

		return res.redirect('/home')
	}
}

module.exports = cadastroEstabController;
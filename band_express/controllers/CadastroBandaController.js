const bcrypt = require('bcrypt');
const {Usuario, Banda, BandaIntegrantes, Cidade, Estado} = require('../models')

const cadastroBandaController = {
    pre: (req, res) => {
        return res.render('pre-cadastro')
    },

    formBanda: async (req, res) => {

        //fazendo a busca de todos os estados
        const buscaEstados = await Estado.findAll({
            raw: true,
            attributes: ['uf']
        });

        //criando uma variável que vai conter a lista de estados
        listaEstados = []

        //buscando os estados e incluindo na lista
        buscaEstados.forEach((estado) => {
            listaEstados.push(estado.uf)
        })

        return res.render('form-banda', {estados: listaEstados});
    },

    saveBanda: async (req, res) => {

        let {nome, email, senha, genero, sobre, estado, cidade, site, canal, emailBanda, integrante, funcao} = req.body;

        nome = nome.trim();
        senha = senha.trim();
        email = email.trim();
        sobre = sobre ? sobre.trim() : '';
        site = site ? site.trim() : '';
        canal = canal ? canal.trim() : '';

        // ----------------Em desenvolvimento ----------------------
        //buscando as cidades de acordo com o estado escolhido pelo usuário
        // const findCidades = await Cidade.findAll({
        //     //Inner join
        //     include: [{
        //         // com a tabela Estado
        //         model: Estado,
        //         // utilizando a chave estabelecida na associação do model Cidade com Estado, cujo alias é 'estado'
        //         as: 'estado',
        //         // com um filtro adicional do estado que o usuário digitou
        //         where: {
        //             uf: estado
        //         }
        //     }]            
        // });

        //lista onde ficarão armazenadas as cidades
        // let listaCidades = []

        //buscando as cidades e incluindo na lista
        // findCidades.forEach((cidade) => {
        //     listaCidades.push(dataValues.nome)
        // })
        // --------------------------------------------------

        // Buscando o id_cidade e id_estado na tabela cidade
        const findIdCidade = await Cidade.findAll({
            //Inner join
            include: [{
                // com a tabela Estado
                model: Estado,
                // utilizando a chave estabelecida na associação do model Cidade com Estado, cujo alias é 'estado'
                as: 'estado',
                // com um filtro adicional do estado que o usuário digitou
                where: {
                    uf: estado
                }
            }],
            // e um último filtro da cidade que o usuário digitou
            where: {
                cidade
            },
        });

        const idCidade = findIdCidade[0].dataValues.id_cidade;
        const idEstado = findIdCidade[0].dataValues.id_estado;

        // Cadastrando dados na tabela usuario
        const dadosUsuario = await Usuario.create({
            nome,
            email,
            senha: bcrypt.hashSync(senha, 10),
            data_cadastro: new Date(),
            id_cidade: idCidade,
            id_estado: idEstado,
            link_perfil: null,
            id_tipos_perfil: 2
        });

        // Salvar o campo link_perfil
        dadosUsuario.link_perfil = `localhost:3000/perfil/banda/${dadosUsuario.id_usuario}`;
        await dadosUsuario.save({ fields: ['link_perfil'] });


        // inserindo dados complementares de banda na tabela banda
        const dadosBanda = await Banda.create({
            id_usuario: dadosUsuario.id_usuario,
            genero,
            sobre,
            site,
            canal,
            email: emailBanda
        });


        // buscando o id dos integrantes na tabela usuario 
        const buscaIdMusico = await Usuario.findOne({
            raw: true,
            attributes: ['nome', 'id_usuario'],
            where: {
                nome: integrante
            }
        })
        const idMusico = buscaIdMusico.id_usuario;


        // inserindo o id da banda e dos integrantes na tabela intermediaria
        const resultado4 = await BandaIntegrantes.create({
            id_banda: dadosBanda.id_banda,
            id_integrante: idMusico,
            funcao
        });

         // Setar session do usuario
         let usuario = { id_usuario:dadosUsuario.id_usuario , nome, senha, email, id_tipos_perfil: 2};

         req.session.usuario = usuario;

        res.redirect('/home')

    }
}


module.exports = cadastroBandaController;
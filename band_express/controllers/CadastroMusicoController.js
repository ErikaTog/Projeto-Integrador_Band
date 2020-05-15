const { Cidade, Usuario, Musico } = require('../models');
const bcrypt = require('bcrypt');

const cadastroMuicoController = {
    formMusician: (req, res) => {
        return res.render('form-musico');
    },
    saveMusician: async (req, res) => {
        let { user, password, email, gender, bio, estado, cidade, site, canal, canto, toco, tecnico, instrument, techinicalSkill } = req.body;
        // console.log(user, password, email, gender, bio, estado, cidade, site, canal, canto, toco, tecnico, instrument, techinicalSkill)
        
        password = bcrypt.hashSync(password, 10);
        
        // Buscando o id da Cidade e do Estado na tabela cidade
        const findIdCidade = await Cidade.findOne({ where: { nome: cidade } })
        
        const idCidade = findIdCidade.dataValues.id_cidade;
        const idEstado = findIdCidade.dataValues.id_estado;

        // Inserindo informação na tabela usuario   
        const dadosUsuario = await Usuario.create({
            nome: user,
            email: email,
            senha: password,
            data_cadastro: new Date(),
            id_cidade: idCidade,
            id_estado: idEstado,
            id_tipos_perfil: 1
        })
        

        // const findIdUsuario = await Usuario.findOne({
        //     where: {
        //         nome: user
        //     }
        // })

        // const idUsuario = findIdUsuario.dataValues.id_usuario;

        // inserindo dados complementares na tabela músico
        // const dadosMusico = await Musico.create({
        //     sexo: gender,
        //     sobre: bio,
        //     site: site,
        //     canal: canal,
        //     canto: canto,
        //     toco: toco,
        //     tecnico: tecnico,
        //     id_usuario: idUsuario
        // });


        res.redirect('/feed');
    }
}

module.exports = cadastroMuicoController;
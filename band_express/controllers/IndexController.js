const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const indexController = {
    view: (req, res) => {
        return res.render('index');
    },

    loginUsuario: async (req, res) => {
        
        //lendo informações do body
        const {email, senha, logado} = req.body;

        // buscando o email informado
        const usuario = await Usuario.findOne({
            attributes: ['nome', 'email', 'senha'],
            raw: true,
            where: {
                email
            }
        });

        // verificando se existe o usuário com o email informado
        if (!usuario) {
            res.redirect("/?error=1");
        }

        // validando senha
        if (!bcrypt.compareSync(senha, usuario.senha)){
            res.redirect("/?error=1");
        }
        
        req.session.usuario = usuario;

        // Armazenar informações (cookie)
        if (logado) {
            res.cookie('logado', usuario.email, { maxAge: 900000 });
        }

        res.redirect('/home');
    }
}

module.exports = indexController;
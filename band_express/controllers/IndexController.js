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
            attributes: ['id_usuario', 'nome', 'email', 'senha', 'id_tipos_perfil', 'avatar', 'admin'],
            raw: true,
            where: {
                email
            }
        });

        // verificando se existe o usuário com o email informado
        if (!usuario) {
            // res.redirect("/?error=1");
            return res.render('feedbackGeral', { 
                imagem: '/img/feedback_login.svg',
                titulo: 'Login ou senha inválidos!',
                mensagem: 'Clique em voltar e tente novamente',
                botao: 'Voltar',
                irPara: '/'
            });
        }

        // validando senha
        if (!bcrypt.compareSync(senha, usuario.senha)){
            // res.redirect("/?error=1");
            return res.render('feedbackGeral', { 
                imagem: '/img/feedback_login.svg',
                titulo: 'Login ou senha inválidos!',
                mensagem: 'Clique em voltar e tente novamente',
                botao: 'Voltar',
                irPara: '/'
            });
        }
        
        req.session.usuario = usuario;

        // Armazenar informações (cookie)
        if (logado) {
            res.cookie('logado', usuario.email, { maxAge: 24*60*60*1000 }); // 24 horas
        }

        res.redirect('/home');
    },

    logoutUsuario:  async (req, res) => {

        req.session.destroy();
        
        res.redirect('/');

    }
}

module.exports = indexController;
const { Fale_conosco } = require('../models');

const faleConoscoController = {
    view: (req, res) => {
        return res.render('fale-conosco', { 
            title: 'Fale Conosco', 
            usuario: req.session.usuario,
            errors: req.flash('errorValidator')
        });
    },
    saveMsg: async (req, res) => {
        let { nome, email, assunto, mensagem } = req.body;

        nome = nome.trim();
        email = email.trim();
        mensagem = mensagem.trim();

        const dados = await Fale_conosco.create({
            nome,
            email,
            assunto,
            mensagem
        })

        res.render('feedbackGeral', { 
            imagem: '/img/feedback_editar.svg',
            titulo: `Olá ${dados.nome}!`,
            mensagem: 'Agradecemos por entrar em contato, em breve retornaremos sua mensagem. Fique atento ao seu email e verifique sua caixa de span',
            botao: 'Voltar',
            irPara: '/home'
        });
    }
} 

module.exports = faleConoscoController;
const { Usuario } = require('../models');

const cookieLogin = async (req, res, next) => {
    if (req.cookies.logado != undefined && req.session.usuario == null) {
        // Salvar e-mail
        let email = req.cookies.logado;

        // Procurar se há um usuário com esse e-mail
        const usuario = await Usuario.findOne({
            attributes: ['id_usuario', 'nome', 'email', 'senha', 'id_tipos_perfil'],
            raw: true,
            where: {
                email
            }
        });

        if (usuario.email == email) {
            req.session.usuario = usuario
        }
    }

    next();
}

module.exports = cookieLogin;
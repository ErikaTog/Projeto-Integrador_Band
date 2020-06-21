const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const adminController = {
    show: async (req, res) => {

        // Burcar Usuários
        const redeUsuarios = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'email'],
            limit: 10,
            order: [['id_usuario', 'ASC']]
        })

        return res.render('admin', { 
            usuario: req.session.usuario,
            redeUsuarios,
            errors: req.flash('errorValidator')
        });
    },
    changePassword: async (req, res) => {
        let { id: id_usuario, senhaNova } = req.body;
        
        senhaNova = bcrypt.hashSync(senhaNova, 10);

        const senhaBD = await Usuario.findOne({ where: { id_usuario } });

        senhaBD.senha = senhaNova;

        await senhaBD.save({ fields: ['senha'] });

        res.redirect(`/admin`);
    },
    deleteUsuario: async (req, res) => {
        await Usuario.destroy({
            where: { id_usuario: req.params.id }
        });

        return
    },
    loadUsuario: async (req, res) => {
        const { page } = req.params;

        const limit = 5;

        const usuarios = await Usuario.findAll({
            raw: true,
            attributes: ['id_usuario', 'nome', 'email'],
            offset: (limit * page),
            limit,
            order: [['id_usuario', 'ASC']]
        })

        return res.send(usuarios);
    },
} 

module.exports = adminController;
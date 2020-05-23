const { Usuario, Cidade, Estado, Estabelecimento, Funcionamento, Minha_rede } = require('../models'); 

const perfilEstabController = {
    show: async (req, res) => {

        let id_usuario = req.session.usuario.id_usuario

         // Dados da tabela Usuario
         const dadosUsuario = await Usuario.findAll({
			where: {
                id_usuario: id_usuario
            }
        });

        // Quantidade de pessoas que o usuario esta seguindo e que seguem ele
        const totalSeguindo = await Minha_rede.count({
			where: {
                id_usuario: id_usuario
            }
        });
        const totalSeguidores = await Minha_rede.count({
			where: {
                id_usuario_seguido: id_usuario
            }
        });

        // Dados da tabela Estabelecimento referente ao usuario
        const dadosEstab = await Estabelecimento.findAll({
			where: {
                id_usuario: id_usuario
            }
        });

        // Dados da tabela Cidade/Estado referente ao usuario
        const nomeCidade = await Cidade.findAll({
            where: {
                id_cidade: dadosUsuario[0].dataValues.id_cidade
            }
        })
        const nomeEstado = await Estado.findAll({
            where: {
                id_estado: dadosUsuario[0].dataValues.id_estado
            }
        })

        let dadosView = {
            avatar: dadosUsuario[0].dataValues.avatar,
            wallpaper: dadosUsuario[0].dataValues.wallpaper,
            totalSeguindo,
            totalSeguidores,
            categoria: dadosEstab[0].dataValues.categoria,
            local: nomeCidade[0].dataValues.nome + ' / ' + nomeEstado[0].dataValues.uf,
            site: dadosEstab[0].dataValues.site,
            // servicos: dadosEstab[0].dataValues.servicos,
            sobre: dadosEstab[0].dataValues.sobre
        }

        res.render('perfil-estab', { title: 'Perfil', usuario: req.session.usuario, dadosView});
    }
}

module.exports = perfilEstabController;
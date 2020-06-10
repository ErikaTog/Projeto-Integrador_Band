const { Cidade, Usuario, Musico, Instrumento, Tecnico} = require('../models');

const find = async () => {

    const link = await Usuario.findOne({
        where: { id_usuario: 2 },
        raw: true,
        attributes: ['link_perfil']
    })

    console.log(link)
};

find();
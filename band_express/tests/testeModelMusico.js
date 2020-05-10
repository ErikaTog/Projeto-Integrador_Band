const { sequelize, Musico } = require('../models');

Musico.findAll({
        include: 'usuario'
    }, {
        order:['id_musico', 'ASC']
    }).then(
    data => {
        
        console.log(data.map( u => u.toJSON()));
        sequelize.close();
    }
)
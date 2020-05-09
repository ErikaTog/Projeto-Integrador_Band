const { sequelize, Usuario } = require('../models');

Usuario.findAll().then(
    data => {
        console.log(data.map( u => u.toJSON()));
        sequelize.close();
    }
)

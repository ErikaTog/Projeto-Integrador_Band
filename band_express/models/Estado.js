const Estado = (sequelize, DataTypes) => {
    let estado = sequelize.define(
        'Estado', 
        {
            id_estado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            uf: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: "estado",
            timestamps: false
        }
    );

    estado.associate = models => {
        estado.hasMany(models.Cidade, {
            foreignKey: 'id_estado', 
            as: 'cidades'
        });
        estado.hasMany(models.Usuario, {
            foreignKey: 'id_estado', 
            as: 'usuarios'
        });
    };

    return estado;
};

module.exports = Estado;
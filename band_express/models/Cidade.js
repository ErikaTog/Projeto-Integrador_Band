const Cidade = (sequelize, DataTypes) => {
    const cidade = sequelize.define(
        'Cidade', 
        {
            id_cidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            cidade: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_estado: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "cidade",
            timestamps: false
        }
    );

    cidade.associate = models => {
        cidade.belongsTo(models.Estado, {
            foreignKey: 'id_estado', 
            as: 'estado'
        });
        cidade.hasMany(models.Usuario, {
            foreignKey: 'id_cidade', 
            as: 'usuarios'
        });
    };

    return cidade;
};

module.exports = Cidade;
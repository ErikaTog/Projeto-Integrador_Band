const Vagas = (sequelize, DataTypes) => {
    let vagas = sequelize.define(
        'Vagas', 
        {
            id_vagas: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            local: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo_vaga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "vagas",
            timestamps: false
        }
    );

    vagas.associate = (models) => {
        vagas.belongsTo(models.Usuario, {
            foreignKey:'id_usuario',
            as:'usuario'
        });
    };

    return vagas;
};

module.exports = Vagas;

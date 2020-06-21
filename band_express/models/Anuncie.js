const Anuncie = (sequelize, DataTypes) => {
    let anuncie = sequelize.define(
        'Anuncie', 
        {
            id_anuncie: {
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
            cidade_vaga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            estado_vaga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            valor: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: false
            },
            img_anuncio: {
                type: DataTypes.STRING,
                allowNull: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "anuncie",
            timestamps: false
        }
    );

    anuncie.associate = (models) => {
        anuncie.belongsTo(models.Usuario, {
            foreignKey:'id_usuario',
            as:'usuario'
        });
    };

    return anuncie;
};

module.exports = Anuncie;

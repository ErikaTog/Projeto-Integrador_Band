const Minha_rede = (sequelize, DataTypes) => {
    let minha_rede = sequelize.define(
        'Minha_rede', 
        {
            id_minha_rede: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_usuario_seguido: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "minha_rede",
            timestamps: false
        }
    );

    musico.associate = models => {
        musico.belongsTo(models.Usuario, { 
            foreignKey: 'id_usuario', 
            as: 'usuario'
        });
        musico.belongsTo(models.Usuario, { 
            foreignKey: 'id_usuario_seguido', 
            as: 'usuario_seguido'
        });
    };

    return minha_rede;
};

module.exports = Minha_rede;
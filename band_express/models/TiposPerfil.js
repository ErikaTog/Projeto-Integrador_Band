const TiposPerfil = (sequelize, DataTypes) => {
    let tipos_perfil = sequelize.define(
        'TiposPerfil', 
        {
            id_tipos_perfil: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: "tipos_perfil",
            timestamps: false
        }
    );

    tipos_perfil.associate = models => {
        tipos_perfil.hasMany(models.Usuario, {
            foreignKey: 'id_tipos_perfil', 
            as: 'perfis'
        });
    };

    return tipos_perfil;
};

module.exports = TiposPerfil;
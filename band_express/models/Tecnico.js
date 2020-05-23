const Tecnico = (sequelize, DataTypes) => {
    let tecnico = sequelize.define(
        'Tecnico', 
        {
            id_tecnico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            habilidade_tecnica: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: "tecnico",
            timestamps: false
        }
    );

    tecnico.associate = models => {
        tecnico.belongsToMany(models.Musico, { 
            through: 'musico_tecnicos', 
            foreignKey: 'id_tecnico',
            as: 'musicos'
        });
        tecnico.hasMany(models.MusicoTecnicos, {
            foreignKey: 'id_tecnico',
            as: 'habilidade_tecnicas'
        });
    }

    return tecnico;
};

module.exports = Tecnico;

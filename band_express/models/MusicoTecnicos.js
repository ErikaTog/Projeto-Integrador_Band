const MusicoTecnicos = (sequelize, DataTypes) => {
    const musicoTecnicos = sequelize.define(
        'MusicoTecnicos', 
        {
            id_musico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            id_tecnico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            }
        }, {
            tableName: "musico_tecnicos",
            timestamps: false
        });

        musicoTecnicos.associate = models => {
            musicoTecnicos.belongsTo(models.Musico,{ 
                foreignKey:  'id_musico',
                as: 'musicos'
            })
            musicoTecnicos.belongsTo(models.Tecnico,{
                foreignKey: 'id_tecnico',
                as: 'habilidade_tecnicas'
            })
        };


    return musicoTecnicos;
};

module.exports = MusicoTecnicos;
const MusicoInstrumentos = (sequelize, DataTypes) => {
    const musicoInstrumentos = sequelize.define(
        'MusicoInstrumentos', 
        {
            id_musico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            id_instrumento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            }
        }, {
            tableName: "musico_instrumentos",
            timestamps: false
        });

        musicoInstrumentos.associate = models => {
            musicoInstrumentos.belongsTo(models.Musico,{ 
                foreignKey:  'id_musico',
                as: 'musicos'
            })
            musicoInstrumentos.belongsTo(models.Instrumento,{
                foreignKey: 'id_instrumento',
                as: 'instrumentos'
            })
        };


    return musicoInstrumentos;
};

module.exports = MusicoInstrumentos;
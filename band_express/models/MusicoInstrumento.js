const MusicoInstrumento = (sequelize, DataTypes) => {
    let musico_instrumento = sequelize.define(
        'MusicoInstrumento', 
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
            },
        }, {
            tableName: "musico_instrumentos",
            timestamps: false
        }
    );

    return musico_instrumento;
};

module.exports = MusicoInstrumento;
const MusicoTecnico = (sequelize, DataTypes) => {
    let musico_tecnico = sequelize.define(
        'MusicoTecnico', 
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
            },
        }, {
            tableName: "musico_tecnicos",
            timestamps: false
        }
    );

    return musico_tecnico;
};

module.exports = MusicoTecnico;
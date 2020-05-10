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

    return tecnico;
};

module.exports = Tecnico;

const BandaIntegrantes = (sequelize, DataTypes) => {
    const bandaIntegrantes = sequelize.define('BandaIntegrantes', {
        
        id_banda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_integrantes: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        funcao: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "banda_integrantes",
        timestamps: false
    });

    return bandaIntegrantes;
};

module.exports = BandaIntegrantes;
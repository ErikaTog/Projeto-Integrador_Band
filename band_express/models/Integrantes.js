const Integrantes = (sequelize, DataTypes) => {
    const integrantes = sequelize.define('Integrantes', {
        
        id_integrantes: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "integrantes",
        timestamps: false
    });

    return integrantes;
};

module.exports = Integrantes;
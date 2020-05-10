const Musico = (sequelize, DataTypes) => {
    let musico = sequelize.define(
        'Musico', 
        {
            id_musico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            sexo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sobre: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cidade: {
                type: DataTypes.STRING,
                allowNull: false
            },
            site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            canal: {
                type: DataTypes.STRING,
                allowNull: true
            },
            canto: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            toco: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            tecnico: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "musico",
            timestamps: false
        }
    );

    return musico;
};

module.exports = Musico;

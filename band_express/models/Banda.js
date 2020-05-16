const Banda = (sequelize, DataTypes) => {
    const banda = sequelize.define('Banda', {

        id_banda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sobre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        site: {
            type: DataTypes.STRING,
            allowNull: true
        },
        canal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "banda",
        timestamps: false
    });

    banda.associate = (listaDeModelos) => {
        banda.belongsTo(listaDeModelos.Usuario,{
            foreignKey: 'id_usuario',
            as: 'bandaUsuario'
        })
        banda.hasMany(listaDeModelos.BandaIntegrantes, {
            foreignKey: 'id_banda',
            as: 'bandaIntegrantes'
        })

    };

    return banda;
}

module.exports = Banda;
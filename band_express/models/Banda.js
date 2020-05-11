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
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
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
            as: 'usuariobanda'
        })
        banda.belongsToMany(listaDeModelos.Integrante, {
            foreignKey: 'id_integrantes',
            as: 'bandaintegrantes',
            through: listaDeModelos.BandaIntegrantes
        })
    };

    return banda;
}

module.exports = Banda;
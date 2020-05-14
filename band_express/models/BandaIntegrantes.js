const BandaIntegrantes = (sequelize, DataTypes) => {
    const bandaIntegrantes = sequelize.define('BandaIntegrantes', {
        
        id_banda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_integrante: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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

    bandaIntegrantes.associate = (listaDeModelos) => {
        bandaIntegrantes.belongsTo(listaDeModelos.Usuario,{
            foreignKey:  'id_integrante',
            as: 'integrantesUsuario'
        })
        bandaIntegrantes.belongsTo(listaDeModelos.Banda,{
            foreignKey: 'id_banda',
            as: 'integrantesBanda'
        })
    };


    return bandaIntegrantes;
};

module.exports = BandaIntegrantes;
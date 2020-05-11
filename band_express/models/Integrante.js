const Integrante = (sequelize, DataTypes) => {
    const integrante = sequelize.define('Integrante', {
        
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

    integrante.associate = (listaDeModelos) => {
        integrante.belongsTo(listaDeModelos.Usuario,{
            foreignKey: 'id_usuario',
            as: 'usuariointegrante'
        })

        integrante.belongsToMany(listaDeModelos.Banda, {
            foreignKey: 'id_banda',
            through: listaDeModelos.BandaIntegrantes,
            as: 'integrantesbanda'  
        })
    }    

    return integrante;
};

module.exports = Integrante;
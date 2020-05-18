const Audio = (sequelize, DataTypes) => {
    let audio = sequelize.define(
        'Audio', 
        {
            id_audio: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            caminho: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "audio",
            timestamps: false
        }
    );

    audio.associate = (listaDeModelos) => {
        audio.belongsTo(listaDeModelos.Usuario, {
            foreignKey: 'id_usuario', 
            as: 'audioUsuario'
        });
    };

    return audio;
};

module.exports = Audio;
const Video = (sequelize, DataTypes) => {
    let video = sequelize.define(
        'Video', 
        {
            id_video: {
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
            tableName: "video",
            timestamps: false
        }
    );

    video.associate = (listaDeModelos) => {
        video.belongsTo(listaDeModelos.Usuario, {
            foreignKey: 'id_usuario', 
            as: 'videoUsuario'
        });
    };

    return video;
};

module.exports = Video;
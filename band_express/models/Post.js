const Post = (sequelize, DataTypes) => {
    let post = sequelize.define(
        'Post', 
        {
            id_post: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            texto: {
                type: DataTypes.STRING(2220),
                allowNull: false
            },
            imagem: {
                type: DataTypes.STRING,
                allowNull: true
            },
            video_arquivo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            video_link: {
                type: DataTypes.STRING,
                allowNull: true
            },
            data_post: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            tableName: "post",
            timestamps: false
        }
    );

    post.associate = (listaDeModelos) => {
        post.belongsTo(listaDeModelos.Usuario, {
            foreignKey: 'id_usuario', 
            as: 'postUsuario'
        });
        post.hasMany(listaDeModelos.Comentario, {
            foreignKey: 'id_post',
            as: 'postComentario'
        });
        post.hasMany(listaDeModelos.Curtida, {
            foreignKey: 'id_post',
            as: 'postCurtida'
        })
    };

    return post;
};

module.exports = Post;
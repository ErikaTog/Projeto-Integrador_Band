const Comentario = (sequelize, DataTypes) => {
    let comentario = sequelize.define(
        'Comentario', 
        {
            id_comentario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            id_post: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comentario: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
        }, {
            tableName: "comentario",
            timestamps: false
        }
    );

    comentario.associate = (listaDeModelos) => {
        comentario.belongsTo(listaDeModelos.Usuario, {
            foreignKey: 'id_usuario', 
            as: 'comentarioUsuario'
        });
        comentario.belongsTo(listaDeModelos.Post, {
            foreignKey: 'id_post', 
            as: 'comentarioPost'
        });
    };

    return comentario;
};

module.exports = Comentario;
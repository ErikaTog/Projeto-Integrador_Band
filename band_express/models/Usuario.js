const Usuario = (sequelize, DataTypes) => {
    let usuario = sequelize.define(
        'Usuario', 
        {
            id_usuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data_cadastro: {
                type: DataTypes.DATE,
                allowNull: false
            },
            id_estado: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_cidade: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: '0',
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            wallpaper: {
                type: DataTypes.STRING,
                allowNull: true
            },
            link_perfil: {
                type: DataTypes.STRING,
                allowNull: true
            },
            id_tipos_perfil: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "usuario",
            timestamps: false
        }
    );

    usuario.associate = models => {
        usuario.belongsTo(models.TiposPerfil, {
            foreignKey: 'id_tipos_perfil', 
            as: 'tipo_perfil'
        });
        usuario.belongsTo(models.Estado, {
            foreignKey: 'id_estado', 
            as: 'estado'
        });
        usuario.belongsTo(models.Cidade, {
            foreignKey: 'id_cidade', 
            as: 'cidade'
        });
        usuario.hasOne(models.Musico, {
            foreignKey: 'id_usuario', 
            as: 'musico'
        }); 
        usuario.hasOne(models.Banda, { 
            foreignKey: 'id_usuario',
            as: 'usuarioBanda'
        });
        usuario.hasMany(models.BandaIntegrantes, {
            foreignKey: 'id_integrante',
            as: 'usuarioIntegrantes'
        });
        usuario.hasOne(models.Estabelecimento, { 
            foreignKey: 'id_usuario',
            as: 'usuarioEstab'
        });
        usuario.hasMany(models.Audio, {
            foreignKey: 'id_usuario',
            as: 'usuarioAudio'
        });
        usuario.hasMany(models.Video, {
            foreignKey: 'id_usuario',
            as: 'usuarioVideo'
        });
        usuario.hasMany(models.Post, {
            foreignKey: 'id_usuario',
            as: 'usuarioPost'
        });
        usuario.hasMany(models.Comentario, {
            foreignKey: 'id_usuario',
            as: 'usuarioComentario'
        });
        usuario.hasMany(models.Curtida, {
            foreignKey: 'id_usuario',
            as: 'usuarioCurtida'
        })
    };

    return usuario;
};

module.exports = Usuario;
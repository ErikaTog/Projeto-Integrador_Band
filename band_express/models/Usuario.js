const Usuario = (sequelize, DataTypes) => {
    let usuario = sequelize.define('Usuario', {
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
        admin: {
            type: DataTypes.BOOLEAN,
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
        perfil_id_perfil: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "usuario",
        timestamps: false
    });

    usuario.associate = (listaDeModelos) => {
        usuario.hasOne(listaDeModelos.Banda, {
            as: 'usuarioBanda'
        })
        usuario.hasMany(listaDeModelos.BandaIntegrantes, {
            as: 'usuarioIntegrantes'
        })
    };

    return usuario;
};

module.exports = Usuario;
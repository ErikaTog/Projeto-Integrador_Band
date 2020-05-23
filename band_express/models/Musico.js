const Musico = (sequelize, DataTypes) => {
    const musico = sequelize.define(
        'Musico', 
        {
            id_musico: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            sexo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sobre: {
                type: DataTypes.TEXT,
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
            canto: {
                type: DataTypes.BOOLEAN,
                defaultValue: '0',
                allowNull: false
            },
            toco: {
                type: DataTypes.BOOLEAN,
                defaultValue: '0',
                allowNull: true
            },
            tecnico: {
                type: DataTypes.BOOLEAN,
                defaultValue: '0',
                allowNull: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "musico",
            timestamps: false
        }
    );

    musico.associate = models => {
        musico.belongsTo(models.Usuario, { 
            foreignKey: 'id_usuario', 
            as: 'usuario'
        });
        musico.belongsToMany(models.Instrumento, { 
            through: 'musico_instrumentos', 
            foreignKey: 'id_musico',
            as: 'instrumentos'
        });
        musico.belongsToMany(models.Tecnico, { 
            through: 'musico_tecnicos', 
            foreignKey: 'id_musico',
            as: 'tecnicos'
        });
        musico.hasMany(models.MusicoInstrumentos, {
            foreignKey: 'id_musico',
            as: 'musicos'
        });
        musico.hasMany(models.MusicoTecnicos, {
            foreignKey: 'id_musico',
            as: 'musicosTec'
        });
    };

    return musico;
};

module.exports = Musico;

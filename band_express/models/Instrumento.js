const Instrumento = (sequelize, DataTypes) => {
    const instrumento = sequelize.define(
        'Instrumento', 
        {
            id_instrumento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            instrumento: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        }, {
            tableName: "instrumento",
            timestamps: false
        }
    );

    instrumento.associate = models => {
        instrumento.belongsToMany(models.Musico, { 
            through: 'musico_instrumentos', 
            foreignKey: 'id_instrumento',
            as: 'musicos'
        });
        instrumento.hasMany(models.MusicoInstrumentos, {
            foreignKey: 'id_instrumento',
            as: 'instrumentos'
        });
    }

    return instrumento;
};

module.exports = Instrumento;

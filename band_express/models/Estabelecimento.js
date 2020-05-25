const Estabelecimento = (sequelize, DataTypes) => {
    let estabelecimento = sequelize.define(
        'Estabelecimento', 
        {
            id_estab: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false
            },
            sobre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            servicos: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telefone: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            funcionamento: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: true
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "estabelecimento",
            timestamps: false
        }
    );

    estabelecimento.associate = (models) => {
        estabelecimento.belongsTo(models.Usuario, {
            foreignKey:'id_usuario',
            as:'usuario'
        });
        estabelecimento.hasMany(models.Funcionamento, { 
            // through: 'funcionamento', 
            foreignKey: 'id_estab',
            as: 'dadosFuncionamento'
        });
    };

    return estabelecimento;
};

module.exports = Estabelecimento;

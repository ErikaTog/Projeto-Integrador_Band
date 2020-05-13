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
            estado: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cidade: {
                type: DataTypes.STRING,
                allowNull: false
            },
            site: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            telefone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            funcionamento: {
                type: DataTypes.BOOLEAN,
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
        estabelecimento.belongsToMany(models.Funcionamento, { 
            through: 'funcionamento', 
            foreignKey: 'id_estab',
            as: 'funcionamentoEstab'
        });
    };


    return estabelecimento;
};

module.exports = Estabelecimento;

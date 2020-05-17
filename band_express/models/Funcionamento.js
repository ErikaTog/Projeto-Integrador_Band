const Funcionamento = (sequelize, DataTypes) => {
    let funcionamento = sequelize.define(
        'Funcionamento', 
        {
            id_funcionamento: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            dia: {
                type: DataTypes.STRING,
                allowNull: false
            },
            horario_abertura: {
                type: DataTypes.STRING,
                allowNull: false
            },
            horario_fechamento: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_estab: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "funcionamento",
            timestamps: false
        }
    );
    funcionamento.associate = (models) => {
        funcionamento.belongsTo(models.Estabelecimento, { 
            // through: 'estabelecimento', 
            foreignKey: 'id_estab',
            as: 'id_estab'
        });
    }

    return funcionamento;
};

module.exports = Funcionamento;
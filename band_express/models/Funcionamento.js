const Funcionamento = (sequelize, DataTypes) => {
    let funcionamento = sequelize.define(
        'Funcionamento', 
        {}, {
            tableName: "funcionamento",
            timestamps: false
        })

    return funcionamento;
};

module.exports = Funcionamento;
const Estabelecimento = (sequelize, DataTypes) => {
    let estabelecimento = sequelize.define(
        'Estabelecimento', 
        {}, {
            tableName: "estabelecimento",
            timestamps: false
        })

    return estabelecimento;
};

module.exports = Estabelecimento;

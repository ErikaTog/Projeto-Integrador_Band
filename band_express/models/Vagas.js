const Vagas = (sequelize, DataTypes) => {
    let vagas = sequelize.define(
        'Vagas', 
        {

        }, {
            tableName: "vagas",
            timestamps: false
        }
    );

    return vagas;
};

module.exports = Vagas;

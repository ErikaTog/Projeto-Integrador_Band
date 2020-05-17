const Bate_papo = (sequelize, DataTypes) => {
    let bate_papo = sequelize.define(
        'Bate_papo', 
        {

        }, {
            tableName: "bate_papo",
            timestamps: false
        }
    );

    return bate_papo;
};

module.exports = Bate_papo;

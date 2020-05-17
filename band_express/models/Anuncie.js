const Anuncie = (sequelize, DataTypes) => {
    let anuncie = sequelize.define(
        'Anuncie', 
        {
            
        }, {
            tableName: "anuncie",
            timestamps: false
        }
    );

    return anuncie;
};

module.exports = Anuncie;

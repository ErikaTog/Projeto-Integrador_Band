const Instrumento = (sequelize, DataTypes) => {
    let instrumento = sequelize.define(
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
                allowNull: false
            }
        }, {
            tableName: "instrumento",
            timestamps: false
        }
    );

    return instrumento;
};

module.exports = Instrumento;

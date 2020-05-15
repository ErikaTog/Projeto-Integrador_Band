const Fale_conosco = (sequelize, DataTypes) => {
    let fale_conosco = sequelize.define(
        'Fale_conosco', 
        {
            id_fale_conosco: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            assunto: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mensagem: {
                type: DataTypes.STRING,
                allowNull: false
            } 
        }, {
            tableName: "fale_conosco",
            timestamps: false
        }
    );
    
    return fale_conosco;
};

module.exports = Fale_conosco;
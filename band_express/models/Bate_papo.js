const Bate_papo = (sequelize, DataTypes) => {
    let bate_papo = sequelize.define(
        'Bate_papo', 
        {
            id_bate_papo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            mensagem: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_data: {
                type: DataTypes.DATE,
                allowNull: false
            },
            id_usuario_remetente: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            id_usuario_destinatario: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            tableName: "bate_papo",
            timestamps: false
        }
    );

    return bate_papo;
};

module.exports = Bate_papo;

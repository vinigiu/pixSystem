function Carteira (sequelize, Datatypes) {
    let nome = 'Carteira';
    let cols = 
    {
        saldo:{type: Datatypes.STRING},
        usuarios_id: {type: Datatypes.INTEGER},
    };
    let configs = 
    {
        tableName: 'carteiras',
        timestamps: false
    };
    const Carteira = sequelize.define(nome, cols, configs);

    Carteira.associate = (models) => {
        Carteira.belongsTo(models.Usuario,{
            as: "carteira_usuario",
            foreignKey: "usuarios_id"
        })
    }
    
    return Carteira;
}

module.exports = Carteira
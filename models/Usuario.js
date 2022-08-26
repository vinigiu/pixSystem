function Usuario (sequelize, Datatypes) {
    let nome = 'Usuario';
    let cols = 
    {
        nome:{type: Datatypes.STRING},
        sobrenome: {type: Datatypes.STRING},
        cpf: {type: Datatypes.INTEGER},
        data_nasc: {type: Datatypes.DATE},
        rg: {type: Datatypes.INTEGER},
        email: {type: Datatypes.STRING},
        senha: {type: Datatypes.STRING},
        ativo: {type: Datatypes.BOOLEAN},
    };
    let configs = 
    {
        tableName: 'usuarios',
        timestamps: false
    };
    const Usuario = sequelize.define(nome, cols, configs);

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Chave,{
            as: "usuario_chave",
            foreignKey: "usuarios_id"
        })

        Usuario.hasOne(models.Carteira,{
            as: "usuario_carteira",
            foreignKey: "usuarios_id"
        })
    }

    return Usuario;
}

module.exports = Usuario
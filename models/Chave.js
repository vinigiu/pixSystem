function Chave (sequelize, Datatypes) {
    let nome = 'Chave';
    let cols = 
    {
        chave:{type: Datatypes.STRING},
        usuarios_id: {type: Datatypes.INTEGER},
        tipos_chaves_id: {type: Datatypes.INTEGER},
    };
    let configs = 
    {
        tableName: 'chaves',
        timestamps: false
    };
    const Chave = sequelize.define(nome, cols, configs);

    Chave.associate = (models) => {
        Chave.belongsTo(models.TipoChave,{
            as: "chave_tipo_chave",
            foreignKey: "tipos_chaves_id"
        })

        Chave.belongsTo(models.Usuario,{
            as: "chave_usuario",
            foreignKey: "usuarios_id"
        })
    }

    return Chave;
}

module.exports = Chave
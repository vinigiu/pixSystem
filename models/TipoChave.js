function TipoChave (sequelize, Datatypes) {
    let nome = 'TipoChave';
    let cols = 
    {
        tipo:{type: Datatypes.STRING},
    };
    let configs = 
    {
        tableName: 'tipos_chaves',
        timestamps: false
    };
    const TipoChave = sequelize.define(nome, cols, configs);

    TipoChave.associate = (models) => {
        TipoChave.hasMany(models.Chave,{
            as: "tipo_chave_chave",
            foreignKey: "tipos_chaves_id"
        })
    }

    return TipoChave;
}

module.exports = TipoChave
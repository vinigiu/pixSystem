const db = require('../../models');

const newKey = {};
const keyService = {
    keyRegistration: async (req, lastUser) => {
        keyService.keyType(req)

        newKey.usuarios_id = lastUser.id;
        await db.Chave.create(newKey)

        return newKey
    },

    keyType: (req) => {
        switch (req.body.chave) {
            case "email":
                newKey.chave = req.body.email;
                newKey.tipos_chaves_id = 1
                break;
            case "tel":
                newKey.chave = req.body.tel;
                newKey.tipos_chaves_id = 2
                break;
            case "cpf":
                newKey.chave = req.body.cpf;
                newKey.tipos_chaves_id = 3
                break;
            case "random":
                newKey.chave = Math.random().toString(36).slice(-10);
                newKey.tipos_chaves_id = 4
                break;
        }
    }
}

module.exports = keyService
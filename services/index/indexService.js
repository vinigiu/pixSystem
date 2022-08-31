const db = require('../../models');
const bcrypt = require('bcrypt');

const indexService = {
    confereCPF: async (req) => {
        const cpfDigitado = req.body.login;
		if(await db.Usuario.findOne({where: {cpf: cpfDigitado}})) {
			var user = await db.Usuario.findOne({where: {cpf: cpfDigitado}})
            return user
		} else {
			var user = null;
            return user
		};
    },

    confereSenha: async (req,user) => {
        const senhaDigitada = req.body.senhaAcesso;
        const senhaDb = user.senha;
        const match = await bcrypt.compare(senhaDigitada, senhaDb)
        return match
    }
}

module.exports = indexService
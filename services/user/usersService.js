const db = require('../../models');
const keyService = require ('../keys/keyService')
const walletService = require('../wallets/walletService')
const bcrypt = require('bcrypt')

const usersService = {
    userRegistration: async (req) => {
        let newUser = {}
        newUser.nome = req.body.nome;
        newUser.sobrenome = req.body.sobrenome;
        newUser.cpf = req.body.cpf;
        newUser.data_nasc = req.body.data_nasc;
        newUser.rg = req.body.rg;
        newUser.email = req.body.email;
        newUser.senha = bcrypt.hashSync(req.body.senha,10);
        newUser.ativo = 1;

        let lastUser = await db.Usuario.create(newUser)
        
        //Criando chave
        keyService.keyRegistration(req,lastUser)

        //Criando carteira
        walletService.walletRegistration(req,lastUser)
        
        return lastUser
    },

    userAll: async () => {
        const users = await db.Usuario.findAll();
        return users
    },


}

module.exports = usersService
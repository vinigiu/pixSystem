const db = require('../../models');

const walletService = {
    walletRegistration: async (req,lastUser) => {
        let newWallet = {};
            newWallet.saldo = 100;
            newWallet.usuarios_id = lastUser.id;
            
            await db.Carteira.create(newWallet)

        return newWallet;
    }
}

module.exports = walletService;
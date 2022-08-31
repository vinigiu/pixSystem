const db = require('../models');
const accountsService = require('../services/accounts/accountsService')

const accountController = {
    account: async (req,res) => {
        const user = await db.Usuario.findOne({where:{cpf:req.body.cpf}});
        const wallet = await db.Carteira.findOne({where:{usuarios_id:await user.id}})
        res.status(200).json({
            data: {
                user: req.user,
                saldo: wallet.saldo
            }
        })
    },
    
    transfer: async (req,res) => {
        const valor = req.body.valor;
        const chaveCredito = req.body.chaveCredito;

        const userDebito = await db.Usuario.findOne({where:{id:req.user.id}})
        const userCredito = await db.Chave.findOne({where:{chave:chaveCredito}});

        const carteiraDebito = await db.Carteira.findOne({where:{usuarios_id:userDebito.id}});
        const carteiraCredito = await db.Carteira.findOne({where:{usuarios_id:userCredito.usuarios_id}});

        const saldoCarteiraDebito = await carteiraDebito.saldo;
        const saldoCarteiraCredito = await carteiraCredito.saldo;

        const saldoFinalCarteiraDebito = saldoCarteiraDebito - valor;
        const saldoFinalCarteiraCredito = saldoCarteiraCredito + valor;

        if(saldoCarteiraDebito < valor ) {
            return res.status(401).json({data:"Saldo insuficiente"})
        }
        await db.Carteira.update({saldo: saldoFinalCarteiraDebito},{where:{usuarios_id:userDebito.id}})
        await db.Carteira.update({saldo: saldoFinalCarteiraCredito},{where:{usuarios_id:userCredito.usuarios_id}})

        return res.status(200).json({
            data: {
                saldoAtual: saldoFinalCarteiraDebito
            }
        })
    },

}

module.exports = accountController
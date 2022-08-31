const db = require('../models');

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
        const chaveDebito = req.body.chaveDebito;
        const chaveCredito = req.body.chaveCredito;

        //Necessário implementar lógica para que seja usada para débito automaticamente a conta do usuário logado

        const userDebito = await db.Chave.findOne({where:{chave:chaveDebito}});
        const userCredito = await db.Chave.findOne({where:{chave:chaveCredito}});

        const carteiraDebito = await db.Carteira.findOne({where:{usuarios_id:userDebito.usuarios_id}});
        const carteiraCredito = await db.Carteira.findOne({where:{usuarios_id:userCredito.usuarios_id}});

        const saldoCarteiraDebito = await carteiraDebito.saldo;
        const saldoCarteiraCredito = await carteiraCredito.saldo;

        const saldoFinalCarteiraDebito = saldoCarteiraDebito - valor;
        const saldoFinalCarteiraCredito = saldoCarteiraCredito + valor;

        if(saldoCarteiraDebito < valor ) {
            return res.status(401).json({data:"Saldo insuficiente"})
        }
        await db.Carteira.update({saldo: saldoFinalCarteiraDebito},{where:{usuarios_id:userDebito.usuarios_id}})
        await db.Carteira.update({saldo: saldoFinalCarteiraCredito},{where:{usuarios_id:userCredito.usuarios_id}})

        return res.status(200).json({
            data: {
                saldoAtual: saldoFinalCarteiraDebito
            }
        })
    },

}

module.exports = accountController
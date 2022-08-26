const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken')
const SECRET = require('../config/secret')

const indexController = {
    registerExec: async (req,res) => {
        //Criando usuário
        let newUser = {nome:null, sobrenome:null, cpf:null, data_nasc:null, rg:null, email:null, senha:null, ativo:null}
        newUser.nome = req.body.nome;
        newUser.sobrenome = req.body.sobrenome;
        newUser.cpf = req.body.cpf;
        newUser.data_nasc = req.body.data_nasc;
        newUser.rg = req.body.rg;
        newUser.email = req.body.email;
        newUser.senha = bcrypt.hashSync(req.body.senha,10);
        newUser.ativo = 1;

        await db.Usuario.create(newUser)
        
        //Criando chave
        let newKey = {chave:null,usuarios_id:null,tipos_chaves_id:null}
        const lastUser = await db.Usuario.findOne({
            order: [['id','DESC']] 
        })

        switch(req.body.chave){
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
                newKey.chave = Math.random().toString(36).slice(-10) ;
                newKey.tipos_chaves_id = 4
                break;
        }
        newKey.usuarios_id = lastUser.id;

        await db.Chave.create(newKey)

        
        //Criando carteira
        let newWallet = {saldo:null, usuarios_id:null}
        newWallet.saldo = 0;
        newWallet.usuarios_id = lastUser.id;
        
        await db.Carteira.create(newWallet)
        
        //Resposta final
        const lastKey = await db.Chave.findOne({
            order: [['id','DESC']] 
        })
        const lastWallet = await db.Carteira.findOne({
            order: [['id','DESC']] 
        })

        res.status(200).json({
            data:{
                nome: lastUser.nome,
                chave: lastKey.chave,
                saldo: lastWallet.saldo,
            }
        })
    },

    showUsers: async (req,res) => {
        const users = await db.Usuario.findAll();
        res.status(200).json({
            data: users
        })
    },

    showOneUser: async (req,res) => {
        const user = await db.Usuario.findOne({where:{cpf:req.body.cpf}});
        res.status(200).json({
            data: user
        })
    },


    transfer: async (req,res) => {
        res.status(200).json('Receberá dados de transferência')
    },

    account: async (req,res) => {
        const user = await db.Usuario.findOne({where:{cpf:req.body.cpf}});
        const wallet = await db.Carteira.findOne({where:{usuarios_id:await user.id}})
        res.status(200).json({
            data: {
                user:user,
                saldo: wallet.saldo
            }
        })
    },

    loginExec: async (req,res) => {
        const cpfDigitado = req.body.login;
		const senhaDigitada = req.body.senhaAcesso;

		if(await db.Usuario.findOne({where: {cpf: cpfDigitado}})) {
			var user = await db.Usuario.findOne({where: {cpf: cpfDigitado}})
		} else {
			return res.send("CPF inválido")
		};
		const cpfDb = user.cpf;
		const senhaDb = user.senha;

		if (cpfDigitado != await cpfDb) {
			return res.send("CPF inválido")
		}

        const match = await bcrypt.compare(senhaDigitada, senhaDb)

        if (!match) {
			return res.send("Senha inválida")
		}

        const token = jwt.sign({userID:user.id},SECRET,{expiresIn:600});
        
        res.json({auth:true,token:token})
    },
}

module.exports = indexController
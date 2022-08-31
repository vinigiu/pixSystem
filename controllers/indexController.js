const db = require('../models');
const jwt = require('jsonwebtoken')
const SECRET = require('../config/secret')
const indexService = require('../services/index/indexService')

const indexController = {
    showOneUser: async (req,res) => {
        const user = await db.Usuario.findOne({where:{cpf:req.body.cpf}});
        res.status(200).json({
            data: user
        })
    },

    loginExec: async (req,res) => {
        let user = await indexService.confereCPF(req);

        if (user != null) {
            if(await indexService.confereSenha(req,user)){

                const token = jwt.sign({user:user},SECRET,{expiresIn:600});
                return res.json({auth:true,token:token})

            } else {

                return res.send('Senha inválida')

            }
        } else {

            return res.send("CPF inválido")

        } 

    },
}

module.exports = indexController
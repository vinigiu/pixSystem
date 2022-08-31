const db = require('../models');
const jwt = require('jsonwebtoken')
const SECRET = require('../config/secret')
const indexService = require('../services/index/indexService')
const {validationResult} = require('express-validator')

const indexController = {
    showOneUser: async (req,res) => {
        const user = await db.Usuario.findOne({where:{cpf:req.body.cpf}});
        res.status(200).json({
            data: user
        })
    },

    loginExec: async (req,res) => {
        let user = await indexService.confereCPF(req);
        let errors = validationResult(req)

        if(errors.isEmpty()) {
            if (user != null) {
                if(await indexService.confereSenha(req,user)){    
                    const token = jwt.sign({user:user},SECRET,{expiresIn:600});
                    return res.json({auth:true,token:token})    
                } else {    
                    return res.status(400).json({auth: false, errors:'Senha inválida'})    
                }
            } else {
                return res.status(400).json({auth: false, errors:'CPF Inválido'})
            } 
        } else {
            return res.status(400).json({auth: false, errors:errors.array()})
        }
    },
}

module.exports = indexController
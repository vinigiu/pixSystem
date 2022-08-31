const {body, validationResult} = require('express-validator')

const verifyRegister = {
    validation: [
        body('nome').notEmpty().withMessage('Nome precisa ser preenchido').bail()
            .isString().withMessage('Nome não pode conter caractéres que não sejam letras').bail(),
    
        body('sobrenome')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail(),
    
        body('cpf')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 11, max: 11 }).withMessage('CPF deve conter 11 dígitos').bail(),
    
        body('data_nasc')
            .notEmpty().withMessage('Data de Nascimento precisa ser preenchida').bail(),
    
        body('rg')
            .notEmpty().withMessage('RG precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 9, max: 9 }).withMessage('RG deve conter 9 dígitos').bail(),
    
        body('email')
            .notEmpty().withMessage('Email precisa ser preenchido').bail()
            .isEmail().withMessage('Email inválido').bail(),
    
        body('senha')
            .notEmpty().withMessage('Senha precisa ser preeenchida').bail()
            .isLength({ min: 3, max: 15 }).withMessage('Senha precisa ter no mínimo 3 e no máximo 15 caractéres').bail()
    ],

    checkRegister: (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()})
        }
        next()
    } 
}

module.exports = verifyRegister
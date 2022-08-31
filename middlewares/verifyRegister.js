const {check} = require('express-validator')

function verifyRegister (next) {
    [
        check('nome')
            .notEmpty().withMessage('Nome precisa ser preenchido').bail()
            .isString().withMessage('Nome não pode conter caractéres que não sejam letras').bail(),
        check('sobrenome')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail(),
        check('cpf')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 11, max: 11 }).withMessage('CPF deve conter 11 dígitos').bail(),
        check('data_nasc')
            .notEmpty().withMessage('Data de Nascimento precisa ser preenchida').bail()
            .isISO8601('yyyy-mm-dd').withMessage('Data de Nascimento inválida').bail(),
        check('rg')
            .notEmpty().withMessage('RG precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 9, max: 9 }).withMessage('RG deve conter 9 dígitos').bail(),
        check('rg')
            .notEmpty().withMessage('Email precisa ser preenchido').bail()
            .isEmail().withMessage('Email inválido').bail(),
        check('senha')
            .notEmpty().withMessage('Senha precisa ser preeenchida').bail()
            .isLength({ min: 5, max: 15 }).withMessage('Senha precisa ter no mínimo 5 e no máximo 15 caractéres').bail()
    ]
    next()
}

module.exports = verifyRegister
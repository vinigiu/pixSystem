const {check} = require('express-validator')

function verifyLogin (next) {
    [
        check('login')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 11, max: 11 }).withMessage('CPF deve conter 11 dígitos').bail(),
        check('senhaAcesso')
            .notEmpty().withMessage('Senha precisa ser preeenchida').bail()
            .isLength({ min: 5, max: 15 }).withMessage('Senha precisa ter no mínimo 5 e no máximo 15 caractéres').bail()
    ]
    next()
}

module.exports = verifyLogin
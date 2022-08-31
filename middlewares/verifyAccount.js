const {check} = require('express-validator')

function verifyAccount (next) {
    [
        check('cpf')
            .notEmpty().withMessage('Sobrenome precisa ser preenchido').bail()
            .isNumeric().withMessage('Somente caractéres numéricos são aceitos').bail()
            .isLength({ min: 11, max: 11 }).withMessage('CPF deve conter 11 dígitos').bail(),
    ]
    next()
}

module.exports = verifyAccount
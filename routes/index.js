var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')
const usersController = require ('../controllers/usersController')
const accountsController = require ('../controllers/accountsController')

const verifyJWT = require('../middlewares/verifyJWT')
const verifyRegister = require('../middlewares/verifyRegister')

/* GET home page. */
router.post('/register', verifyRegister.validation, verifyRegister.checkRegister, usersController.registerExec);

router.get('/users', verifyJWT, usersController.userAll);

router.post('/transfer', verifyJWT, accountsController.transfer)

router.get('/account', verifyJWT, accountsController.account)

router.post('/login', indexController.loginExec)

module.exports = router;

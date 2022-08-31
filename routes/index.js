var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')
const usersController = require ('../controllers/usersController')
const accountsController = require ('../controllers/accountsController')

const verifyJWT = require('../middlewares/verifyJWT')
const verifyRegister = require('../middlewares/verifyRegister')
const verifyLogin = require('../middlewares/verifyLogin')
const verifyAccount = require('../middlewares/verifyAccount')

/* GET home page. */
router.post('/register',verifyRegister, usersController.registerExec);

router.get('/users', verifyJWT, usersController.userAll);

router.post('/transfer', verifyJWT, accountsController.transfer)

router.get('/account', verifyAccount, verifyJWT, accountsController.account)

router.post('/login', verifyLogin, indexController.loginExec)

module.exports = router;

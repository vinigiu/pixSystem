var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')
const verifyJWT = require('../middlewares/verifyJWT')

/* GET home page. */
router.post('/register', indexController.registerExec);

router.get('/users', verifyJWT, indexController.showUsers);

router.post('/transfer', verifyJWT, indexController.transfer)

router.get('/account', verifyJWT, indexController.account)

router.post('/login', indexController.loginExec)

module.exports = router;

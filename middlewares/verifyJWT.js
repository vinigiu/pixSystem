const jwt = require("jsonwebtoken");
const SECRET = require('../config/secret')

function verifyJWT (req,res,next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, SECRET, (err,decoded) => {
        if(err) return res.status(401).redirect('/api/login');
        req.user = decoded.user;
        next();
    })
}

module.exports = verifyJWT;
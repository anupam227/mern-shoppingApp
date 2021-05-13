const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                message: "Unauthorised user"
            })
        }
        const decoded = jwt.verify(token, 'KEDALGUNJALWAR');
        req.userData = decoded;
    } catch(e){
        res.status(400).json({
            message: "Token is not valid"
        })
    }
    next();
}

module.exports = auth;
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next){
    const token = req.headers['authorization'];

    if(!token) { return res.status(401).send(req.headers)};

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if (err) { return res.status(401).json({ message: err }) }

        req.userId = decoded.id
        
        next()
    });

}

module.exports = authMiddleware;
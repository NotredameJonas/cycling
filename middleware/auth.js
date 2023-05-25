const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Accessdenied. No token provided');
    try {
        const decoded = jwt.verify(token,
            process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token');
    }
}
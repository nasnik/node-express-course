const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../errors');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new Unauthenticated('No token provided'));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Unauthenticated('Not authorized to access this route'));
        }

        const { id, username } = decoded;
        req.user = { id, username };
        next();
    });
};

module.exports = authenticationMiddleware;
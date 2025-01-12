const jwt = require('jsonwebtoken');
const { Unauthenticated } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new Unauthenticated('No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
         const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (err) {
        return next(new Unauthenticated('Not authorized to access this route'));
    }
};

module.exports = authenticationMiddleware;
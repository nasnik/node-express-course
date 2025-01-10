const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors');

const logon = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest('Please, provide username and password');
    }

    const id = new Date().getDate();

    jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
        if (err) {
            return next(new Error('Failed to generate token'));
        }
        res.status(200).json({ msg: 'user created', token });
    });
};
const hello = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    logon, hello
}
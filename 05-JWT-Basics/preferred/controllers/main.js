const jwt = require('jsonwebtoken');

let ticketsAvailable = 12;

const logon = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide username and password' });
    }

    const id = new Date().getDate();
    try {
        const token = await new Promise((resolve, reject) => {
            jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });

        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ msg: 'Error signing token', error: error.message });
    }
};


const hello = async (req, res) => {
    const { username } = req.user;

    res.status(200).json({
        msg: `Hello, ${username}.`,
        secret: `This is a ticket reservation system for the workshop. 
        Number of available tickets: ${ticketsAvailable}.`,
    });
};

const orderTickets = async (req, res) => {
    const { quantity, name, email } = req.body;

    if (!quantity || !name || !email) {
        return res.status(400).json({ msg: 'Please provide quantity, name, and email' });
    }

    if (quantity > ticketsAvailable) {
        return res.status(400).json({ msg: 'Not enough tickets available' });
    }

    ticketsAvailable -= quantity;

    res.status(200).json({
        msg: `You successfully ordered ${quantity} ticket(s).`,
        remainingTickets: ticketsAvailable,
    });
};

module.exports = { logon, hello, orderTickets };
const express = require('express');
const router = express.Router();

const { logon, hello, orderTickets } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

router.post('/logon', logon);
router.get('/hello', authMiddleware, hello);
router.post('/order', authMiddleware, orderTickets);

module.exports = router;
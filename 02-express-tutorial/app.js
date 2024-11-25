const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const logger = require('./logger');
const {authorize, authCookies} = require('./authorize');
const port = 3000;

const people = require('./routes/people');
const auth = require('./routes/auth');

app.use('/api', logger);
//app.use([authorize, logger]);

app.use(express.static('./public'));
app.use(morgan('tiny'));

//static assets
app.use(express.static('./methods-public'));
//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());
// parse cookies
app.use(cookieParser());

app.use('/api/v1/people', people);
/*app.get('/api/', logger, (req, res)=>{
    res.status(200).json({success: true})
})*/
//app.use('/login', auth); //login from the week 4 video

//optional assignment: cookies
app.post("/logon", (req, res) => {
    const { name } = req.body;
    if (name) {
        res.cookie("name", name, { httpOnly: true });
        res.status(201).json({ message: `Hello, ${name}!` });
    } else {
        res.status(400).json({ error: "Name is required" });
    }
});
app.delete("/logoff", (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ message: "User logged off" });
});
app.get("/test", authCookies, (req, res) => {
    if (req.user) {
        res.status(200).json({ message: `Welcome, ${req.user}!` });
    } else {
        res.status(401).json({ message: "unauthorized" });
    }
});

/////////requests from the video//////////////////
app.get('/about', (req, res) => {
    console.log(req.user);
    res.send('About');
})
app.get('/api/products', (req, res) => {
    res.send('Products');
})
app.get('/api/items', (req, res) => {
    console.log(req.user);
    res.send('Items');
})
/////////////////////////////////////////
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


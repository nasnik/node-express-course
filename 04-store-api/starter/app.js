require('dotenv').config();
require('express-async-errors');
//async errors


const express = require('express');
const req = require("express/lib/request");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
})

app.use('/api/v1/products', productsRouter);
//products route
app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const start = async() => {
    try{
//connect db
        await connectDB(process.env.MONGODB_URI);

        app.listen(port, ()=>{
            console.log(`Server is listening port ${port}...`);
        })
    }catch(err){
        console.log(err)
    }
}
start();
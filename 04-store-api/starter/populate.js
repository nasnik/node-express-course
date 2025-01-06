require('dotenv').config();
const connectDB = require('./db/connect');
const mongoose = require("mongoose");
const Product = require('./models/product');

const jsonPruducts = require('./products.json');
const {json} = require("express");

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.create(jsonPruducts);
        console.log('Success!!!');
        process.exit(0);
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}
start();
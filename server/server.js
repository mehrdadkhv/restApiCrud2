const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path: './config.env'})
const app = require('./app')

mongoose
    .connect(DB, {
        userNewUrlParser: true,
        userCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful'))
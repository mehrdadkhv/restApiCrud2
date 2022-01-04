const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./src/middlewares');
const userRouter = require('./routes/userRoutes');
const api = require('./src/api');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


// Body pareser , reading data from into req.body
app.use(express.json({limit: '10kb'}));


// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
    });
});

app.use('/api/v1', api);
app.use('/api/v1/users',userRouter)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
var xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'To many request from this IP.Please try again later'
});

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'get: api testing is working '
    });
});


app.post('/test', (req, res) => {
    res.status(200).send({
        message: 'post : api testing is working '
    });
})

app.put('/test', (req, res) => {
    res.status(200).send({
        message: 'put : api testing is working '
    });
})

app.delete('/test', (req, res) => {
    res.status(200).send({
        message: 'delete : api testing is working '
    });
})

// app.get('/products', (req, res) => {
//     res.status(200).send({ message: 'products are returned' });
// })

//client error handling middleware
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
    ;
})

//server error handling middleware

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})

module.exports = app;
const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./users');
const weatherRouter = require('./weather');

/* Ping Api*/
router.get('/ping', function(req, res, next) {
    res.send('pong');
});

/* Auth Routes*/
router.use('/auth', authRouter);

/* User Routes*/
router.use('/users', userRouter);

/* Weather Routes*/
router.use('/weather', weatherRouter);

module.exports = {
    router
}

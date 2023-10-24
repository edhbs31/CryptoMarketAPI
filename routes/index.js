const express = require('express');

const router = express.Router();
const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
// Limiter is to prevent users from sending requests multiple times each IP to 100 requests per windowMs for 1 second request
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 10, // limit each IP to 100 requests per windowMs
});
// Middleware is used to check if the user has already login before or not
// Middleware is used to prevent unathorized user that haven't login
const middleware = require('../middleware/auth');
//MiddlewareClient is used to check if the client is valid or not
//MiddlewareClient is used in Login, Register and getData
const { MiddewareClient } = require('../middleware/client');

const RegisterController = require('../controllers/user/RegisterController');
const LoginController = require('../controllers/user/LoginController');
const DashboardController = require('../controllers/dashboard/DashboardController');

router.use('/user', limiter, MiddewareClient, RegisterController);
router.use('/login', limiter,MiddewareClient, LoginController);
router.use('/getData', MiddewareClient, middleware, DashboardController);
module.exports = router;
const router = require('express').Router();
const homepage = require('./homepage');
const login = require('./login');
const signup = require('./signup');
const dashboard = require('./dashboard');

router.use('/', homepage);
router.use('/login', login);
router.use('/signup', signup);
router.use('/dashboard', dashboard);


module.exports = router;
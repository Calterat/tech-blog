const router = require('express').Router();
const homepage = require('./homepage');
const login = require('./login');

router.use('/', homepage);
router.use('/login', login);


module.exports = router;
const router = require('express').Router();
const homepage = require('./homepage');

router.use('/', homepage);


module.exports = router;
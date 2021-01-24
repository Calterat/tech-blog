const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);


router.use((_req, res) => res.status(404).end())

module.exports = router;
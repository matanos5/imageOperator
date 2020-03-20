// eslint-disable-next-line new-cap
const router = require('express').Router();


router.use('/api', require('./api'));

module.exports = router;

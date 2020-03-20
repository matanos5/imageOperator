// eslint-disable-next-line new-cap
const router = require('express').Router();
const resizerRouter = require('./resize');
const healthRouter = require('./health');

router.use('/resize', resizerRouter);
router.use('/health', healthRouter);

module.exports = router
;

// eslint-disable-next-line new-cap
const router = require('express').Router();


const health = async (req, res) => {
  return res.status(200).json({'status': 'Everything up and running'});
};
router.get('/', health);

module.exports = router;



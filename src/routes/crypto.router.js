const { Router, application } = require('express');
const router = Router();

const {
  crypto,
  buyCrypto,
  sellCrypto,
  profileBalance,
  getCryptoPrices,
} = require('../controllers/crypto.controller.js');

router.get('/', crypto);
router.get('/balance', profileBalance);
router.post('/buy', buyCrypto);
router.post('/sell', sellCrypto);
router.get('/prices/:crypto', getCryptoPrices);

module.exports = router;

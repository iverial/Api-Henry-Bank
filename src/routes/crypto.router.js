const { Router, application } = require('express');
const router = Router();

const {
  crypto,
  buyCrypto,
  sellCrypto,
} = require('../controllers/crypto.controller.js');

router.get('/', crypto);
router.post('/buy', buyCrypto);
router.post('/sell', sellCrypto);

module.exports = router;

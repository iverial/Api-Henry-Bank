const { Router } = require('express');
const router = Router();

const {
  registerLockedStake,
  registerTransaction,
  registerCryptos,
} = require('../controllers/admin.controller.js');

router.get('/lockedStake', registerLockedStake);

router.get('/transactions', registerTransaction);

router.get('/cryptos', registerCryptos);

module.exports = router;

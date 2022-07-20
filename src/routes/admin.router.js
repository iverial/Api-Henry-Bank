const { Router } = require('express');
const router = Router();

const {
  registerLockedStake,
  registerTransaction,
  registerCryptos,
  disabledUser,
} = require('../controllers/admin.controller.js');

router.get('/lockedStake', registerLockedStake);

router.get('/transactions', registerTransaction);

router.get('/cryptos', registerCryptos);

router.put('/disabledUser', disabledUser)


module.exports = router;

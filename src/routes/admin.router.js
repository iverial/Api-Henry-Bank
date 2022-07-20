const { Router } = require('express');
const router = Router();

const {
  registerLockedStake,
  registerTransaction,
} = require('../controllers/admin.controller.js');

router.get('/lockedStake', registerLockedStake);

router.get('/transactions', registerTransaction);

module.exports = router;

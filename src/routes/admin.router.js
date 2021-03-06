const { Router } = require('express');
const router = Router();

const {
  registerLockedStake,
  registerTransaction,
  registerCryptos,
  disabledUser,
  enableUser,
  userToAdmin,
  adminToUser,
} = require('../controllers/admin.controller.js');

router.get('/lockedStake', registerLockedStake);

router.get('/transactions', registerTransaction);

router.get('/cryptos', registerCryptos);

router.put('/enableUser', enableUser);

router.put('/disabledUser', disabledUser);

router.put('/userToAdmin', userToAdmin);

router.put('/adminToUser', adminToUser);


module.exports = router;

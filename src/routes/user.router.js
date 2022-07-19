const { Router } = require('express');
const router = Router();

const {
  user,
  userDetail,
  userRecharge,
  userMovements,
} = require('../controllers/user.controller');

router.get('/movements', userMovements);
router.post('/recharge', userRecharge);
router.get('/profile', userDetail);
router.get('/', user);

module.exports = router;

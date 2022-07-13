const { Router } = require('express');
const router = Router();

const {
  user,
  userDetail,
  userRecharge,
} = require('../controllers/user.controller');

router.post('/recharge', userRecharge);
router.get('/profile', userDetail);
router.get('/', user);

module.exports = router;

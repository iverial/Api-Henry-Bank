const { Router } = require('express');
const router = Router();

const {
  user,
  userDetail,
  userRecharge,
  userMovements,
  userEditProfileImage,
} = require('../controllers/user.controller');

router.get('/movements', userMovements);
router.post('/recharge', userRecharge);
router.get('/profile', userDetail);
router.put('/profileImage', userEditProfileImage);
router.get('/', user);

module.exports = router;

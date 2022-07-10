const { Router } = require('express');
const router = Router();

const { user, userDetail } = require('../controllers/user.controller');

router.get('/', user);

router.get('/profile', userDetail);

module.exports = router;

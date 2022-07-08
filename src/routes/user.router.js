const { Router } = require('express');
const router = Router();

const { user } = require('../controllers/user.controller');

router.get('/', user);

module.exports = router;

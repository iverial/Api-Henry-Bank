const { Router, application } = require('express');
const router = Router();

const login = require('../controllers/login.controller.js');

router.post('/', login);

module.exports = router;

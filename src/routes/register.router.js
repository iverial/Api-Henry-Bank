const { Router, application } = require('express');
const router = Router();

const { register } = require('../controllers/register.controller.js');

router.post('/', register);

module.exports = router;

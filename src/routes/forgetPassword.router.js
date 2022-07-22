const { Router, application } = require('express');
const router = Router();
const forgetPassword = require('../controllers/forgetPassword.controller')

router.put('/', forgetPassword)

module.exports = router;
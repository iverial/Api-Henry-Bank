const { Router, application } = require('express');
const router = Router();

const userEmail = require('../controllers/userEmail.controller')

router.get('/', userEmail)

module.exports = router;
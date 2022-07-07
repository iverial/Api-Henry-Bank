const { Router, application } = require('express');
const router = Router();

const { crypto } = require('../controllers/crypto.controller.js');

router.get('/', crypto);

module.exports = router;

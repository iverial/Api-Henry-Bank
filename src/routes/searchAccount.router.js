const { Router, application } = require('express');
const router = Router();

const {searchAccount} = require('../controllers/searchAccount.controller.js')

router.get('/', searchAccount);

module.exports = router;

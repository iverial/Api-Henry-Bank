const { Router, application } = require('express');
const router = Router();

const {searchAccount} = require('../controllers/searchAccount.controller.js')
const {tranfer} = require('../controllers/transaction.controller')

router.post('/', searchAccount); // busca el cbu y el alias 

router.put('/tranfer', tranfer); // transaccion 

module.exports = router;

const { Router, application } = require('express');
const router = Router();

const lockedStake = require('../controllers/lockedStake.controller')

router.post('/', lockedStake)

module.exports = router;
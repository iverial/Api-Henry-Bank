const { Router, application } = require('express');
const router = Router();

const {
  userEmail,
  getEmailbyId,
} = require('../controllers/userEmail.controller');

router.get('/:id', getEmailbyId);
router.get('/', userEmail);

module.exports = router;

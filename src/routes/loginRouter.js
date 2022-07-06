const { Router, application } = require('express');
const router = Router();

const { log } = require('../controllers/loginController.js');

router.get('/', (req, res) => {
  res.send(log());
});

module.exports = router;

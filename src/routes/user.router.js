const { Router } = require('express');
const router = Router();

const { allUsers } = require('../controllers/user.controller');

router.get('/', async (req, res) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

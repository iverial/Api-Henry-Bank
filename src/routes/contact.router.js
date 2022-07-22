const { Router, application } = require('express');
const router = Router();

const {
  getContacts,
  createContact,
  deleteContact,
} = require('../controllers/contact.controller.js');

router.get('/', getContacts);
router.post('/', createContact);
router.delete('/:id', deleteContact);

module.exports = router;

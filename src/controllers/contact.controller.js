const { User } = require('../db.js');

const createContact = async (req, res) => {
  const { id, image, name, lastname, email, cbu, alias } = req.body;
  const UserId = req.user.id;

  const user = await User.findByPk(UserId);

  const oldList = user.contactList;

  //Check if contact already exists
  const contactExists = oldList.find(contact => contact.id === id);
  if (contactExists) {
    return res.status(400).json({
      message: 'Contact already exists',
    });
  }

  const newContact = {
    id,
    image,
    name,
    lastname,
    email,
    cbu,
    alias,
  };
  const newList = [...oldList, newContact];
  user.update({
    contactList: newList,
  });

  res.send('Contact created');
};

const getContacts = async (req, res) => {
  const UserId = req.user.id;

  const user = await User.findByPk(UserId);

  const contacts = user.contactList;

  if (!contacts.length) res.status(200).send([]);
  else res.send(contacts);
};

const deleteContact = async (req, res) => {
  const deleteId = req.params.id;
  const UserId = req.user.id;

  const user = await User.findByPk(UserId);

  const oldList = user.contactList;
  const newList = oldList.filter(contact => contact.id !== deleteId);
  user.update({
    contactList: newList,
  });

  res.send('Contact deleted');
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};

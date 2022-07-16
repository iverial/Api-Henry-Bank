const { User } = require('../db.js');

const userEmail = async (req, res) => {
  let users = await User.findAll();
  users = users.map((el) => {
    return { email: el.email };
  });
  res.send(users);
};

const getEmailbyId = async (req, res) => {
  const { id } = req.params;
  let user = await User.findByPk(id);

  if (!user) res.status(404).send('User not found');
  else res.send({ email: user.email });
};

module.exports = { userEmail, getEmailbyId };

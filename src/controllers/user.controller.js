const { User } = require('../db.js');

const allUsers = async id => {
  if (id) {
    const user = await User.findAll({ where: { id: id } });

    return user;
  }

  const users = await User.findAll();

  if (!users.length) throw new Error('Users not found');
  return users;
};

module.exports = {
  user: async (req, res) => {
    const { id } = req.body;

    try {
      const users = await allUsers(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

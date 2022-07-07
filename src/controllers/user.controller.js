const { User } = require('../db.js');

module.exports = {
  allUsers: async () => {
    const users = await User.findAll();

    if (!users.length) throw new Error('Users not found');

    return users;
  },
};

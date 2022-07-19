const { User } = require('../db.js');

const userEmail = async (req, res) => {
  try {
    let users = await User.findAll();
    users = users.map(el => {
      return { email: el.email };
    });
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = userEmail;

const { User } = require('../db.js')

const userEmail = async (req, res ) => {
  let users = await User.findAll();
  users = users.map(el => {return {email: el.email}})
 res.send(users)
}

module.exports = userEmail
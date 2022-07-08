const { hashSync, compareSync } = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');

//############################################################################################
// Register Method for the User
//############################################################################################
const register = async (req, res) => {
  let {
    identity,
    name,
    lastName,
    dateOfBirth,
    gender,
    email,
    city,
    address,
    nationality,
  } = req.body;
  let password = hashSync(req.body.password, 10);

  const [user, created] = await User.findOrCreate({
    where: {
      identity,
      email,
    },
    defaults: {
      identity,
      name,
      lastName,
      dateOfBirth,
      gender,
      email,
      password,
      city,
      address,
    },
  });

  if (created) {
    res.send({ msg: 'Usuario creado', email: user.email });
  } else {
    res.send({ msg: 'Usuario ya existe', email: user.email });
  }
};

module.exports = register;

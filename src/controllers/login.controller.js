const { hashSync, compareSync } = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.SECRET;

const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ where: { email } });

  if (!user) {
    res.send({ msg: 'Usuario no existe' });
  }

  if (!compareSync(password, user.password)) {
    res.send({ msg: 'Contraseña incorrecta' });
  }

  // JSON WEB TOKEN generation
  const payload = {
    email: user.email,
    password: user.password,
  };

  const token = jwt.sign(
    payload,
    SECRET,
    { expiresIn: '1d' },
    (err, token) => {}
  );

  res.send({ msg: 'Login correcto', token });
};

module.exports = login;

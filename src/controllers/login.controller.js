const { hashSync, compareSync } = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.send({ msg: 'Usuario no existe' });
  } else if (!compareSync(password, user.password)) {
    res.send({ msg: 'Contraseña incorrecta' });
  } else {
    // JSON WEB TOKEN generation
    const payload = {
      email: user.email,
      password: user.password,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    res.send({ msg: 'Login correcto', token: 'Bearer ' + token });
  }
};

module.exports = login;

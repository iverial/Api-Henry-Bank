const { hashSync, compareSync } = require('bcrypt');
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_SEND_KEY);

require('dotenv').config();
const SECRET = process.env.SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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

      const msg = {
        to: email,
        from: 'henrybank.proyect@gmail.com',
        subject: 'Nuevo Login a su Cuenta de HenryBank',
        text: 'Hola, se ha logueado en su cuenta de HenryBank',
        html: '<strong>Hola, se ha logueado en su cuenta de HenryBank</strong>',
      };

      sgMail.send(msg);

      const token = jwt.sign(payload, SECRET, { expiresIn: '2d' });

      res.send({ msg: 'Login correcto', token: 'Bearer ' + token });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = login;

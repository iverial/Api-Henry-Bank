const { User } = require('../db.js');
const { hashSync, compareSync } = require('bcrypt');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_SEND_KEY);

const forgetPassword = async (req, res) => {
  try {
    const { password, identity, email } = req.body;
    let passwordhash = hashSync(password, 10);
    let finduserByidentity = await User.findOne({
      where: { identity: identity },
    });
    let usuario = await User.findOne({ where: { email: email } });
    if (!finduserByidentity || !usuario) {
      res.send('el usuario no existe');
    } else {
      await usuario.update({
        password: passwordhash,
      });
      const msg = {
        to: email,
        from: 'henrybank.proyect@gmail.com',
        subject: 'Cambio de contraseña HenryBank',
        text: 'Su contraseña ha sido cambiada, si cree que es un error, por favor comuniquese con el administrador',
        html: '<strong>Su contraseña ha sido cambiada, si cree que es un error, por favor comuniquese con el administrador</strong>',
      };
      sgMail.send(msg);
      res.send('password actualizada con exito.');
    }
  } catch (error) {
    console.log(error.mesagge);
  }
};

module.exports = forgetPassword;

const { hashSync, compareSync } = require('bcrypt');
const { User, Account, Nationality } = require('../db.js');
const jwt = require('jsonwebtoken');

// ############################################################################################
// CBU and Alias generator
// ############################################################################################
const generateCBU = () => {
  let cbu = '';
  const numbers = '0123456789';
  for (let i = 0; i < 22; i++) {
    cbu += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return cbu;
};

let generateAlias = (email) => {
  let alias = email.split('@')[0] + '.henrybank';
  return alias;
};

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
    let account = await Account.create({
      cbu: generateCBU(),
      alias: generateAlias(email),
      balance: 0,
      contacts: [],
      risk: '',
    });

    let national = await Nationality.findOrCreate({
      where: { name: nationality.toLowerCase() },
      defaults: {
        name: nationality.toLowerCase(),
      },
    });

    res.send({ msg: 'Usuario y cuenta creados', email: user.email, account });
  } else {
    res.send({ msg: 'Usuario ya existe', email: user.email });
  }
};

module.exports = register;

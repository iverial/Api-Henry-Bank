const { hashSync, compareSync } = require('bcrypt');
const { User, Account, Nationality, SavingAccount } = require('../db.js');
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

  // Check if theres a User with the same identity or email, if it is, dont create

  if (
    !(await User.findOne({ where: { email } })) &&
    !(await User.findOne({ where: { identity } }))
  ) {
    const user = await User.create({
      identity,
      name,
      lastName,
      dateOfBirth,
      gender,
      email,
      password,
      city,
      address,
    });

    const account = await Account.create({
      cbu: generateCBU(),
      alias: generateAlias(email),
      name: name,
      lastName: lastName,
      balance: 0,
      contacts: email,
    });
    account.setUser(user);

    const [nation, created] = await Nationality.findOrCreate({
      where: { name: nationality },
      defaults: {
        name: nationality,
      },
    });

    nation.addUser(user);

    const savingAccount = await SavingAccount.create({
      ars: 0,
      usd: 0,
    });

    account.setSavingAccount(savingAccount);

    res.send({
      msg: 'Usuario y cuenta creados',
      email: user.email,
      account,
    });
  } else res.send({ msg: 'Usuario ya existe' });
};

module.exports = register;

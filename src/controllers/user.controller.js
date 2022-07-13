const { User, Nationality, Account, SavingAccount } = require('../db.js');

const allUsers = async () => {
  const users = await User.findAll();

  if (!users.length) throw new Error('Users not found');
  return users;
};

detailUser = async (detail) => {
  const nationality = await Nationality.findByPk(detail.NationalityId);
  const account = await Account.findByPk(detail.AccountId);

  const allDetail = {
    identity: detail.identity,
    image: detail.image,
    name: detail.name,
    lastName: detail.lastName,
    gender: detail.gender,
    dateOfBirth: detail.dateOfBirth,
    address: detail.address,
    city: detail.city,
    email: detail.email,
    nationality: nationality.name,
    cbu: account.cbu,
    alias: account.alias,
    balance: account.balance,
  };
  console.log(allDetail);

  return allDetail;
};

const userRecharge = async (amount, detail) => {
  const account = await Account.findByPk(detail.AccountId);
  const saving = await SavingAccount.findByPk(account.SavingAccountId);

  if (!account) throw new Error({ message: 'Account not found' });

  const newBalance = Number(account.balance) + Number(amount);
  await account.update({ balance: newBalance });
  await saving.update({ ars: newBalance });

  return { message: 'Recharge successful' };
};

module.exports = {
  user: async (req, res) => {
    try {
      const users = await allUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  userDetail: async (req, res) => {
    const userDetail = await detailUser(req.user.dataValues);
    res.send(userDetail);
  },

  userRecharge: async (req, res) => {
    const recharge = await userRecharge(req.body.amount, req.user.dataValues);
    res.send(recharge);
  },
};

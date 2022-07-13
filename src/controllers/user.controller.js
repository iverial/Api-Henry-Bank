const {
  User,
  Nationality,
  Account,
  SavingAccount,
  RegisterRecharge,
  RegisterTransaction,
} = require('../db.js');

const allUsers = async () => {
  const users = await User.findAll();

  if (!users.length) throw new Error('Users not found');
  return users;
};

detailUser = async detail => {
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

  await RegisterRecharge.create({
    account: detail.AccountId,
    amount: amount,
  });

  return { message: 'Recharge successful' };
};

const userMovements = async detail => {
  let recharges = await RegisterRecharge.findAll({
    where: { account: detail.AccountId },
  });

  recharges = recharges.map(t => {
    let date = `${t.date.getDate()}/${t.date.getMonth()}/${t.date.getFullYear()}`;
    let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

    return {
      idOp: t.id,
      ['image-icon-paper']: 'plus',
      amount: `+${t.amount}`,
      date: date,
      hour: hour,
    };
  });

  let transactionsSent = await RegisterTransaction.findAll({
    where: { accountOrigin: detail.AccountId },
  });

  transactionsSent = await Promise.all(
    transactionsSent.map(async t => {
      let accountDestiny = await Account.findByPk(t.accountDestiny);
      let date = `${t.date.getDate()}/${t.date.getMonth()}/${t.date.getFullYear()}`;
      let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

      return {
        idOp: t.id,
        ['image-icon-paper']: 'transfer-up',
        amount: `-${t.amount}`,
        date: date,
        hour: hour,
        accountDestiny: {
          cub: accountDestiny.cbu,
          alias: accountDestiny.alias,
          name: accountDestiny.name,
          lastName: accountDestiny.lastName,
        },
      };
    })
  );

  let transactionsReceived = await RegisterTransaction.findAll({
    where: { accountDestiny: detail.AccountId },
  });

  transactionsReceived = await Promise.all(
    transactionsReceived.map(async t => {
      let accountOrigin = await Account.findByPk(t.accountOrigin);
      let date = `${t.date.getDate()}/${t.date.getMonth()}/${t.date.getFullYear()}`;
      let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

      return {
        idOp: t.id,
        ['image-icon-paper']: 'transfer-down',
        amount: `+${t.amount}`,
        date: date,
        hour: hour,
        accountOrigin: {
          cub: accountOrigin.cbu,
          alias: accountOrigin.alias,
          name: accountOrigin.name,
          lastName: accountOrigin.lastName,
        },
      };
    })
  );

  let movements = {
    recharges: recharges,
    transactionsReceived: transactionsReceived,
    transactionsSent: transactionsSent,
  };

  return movements;
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

  userMovements: async (req, res) => {
    const movements = await userMovements(req.user.dataValues);
    res.send(movements);
  },
};

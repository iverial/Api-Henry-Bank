const axios = require('axios');

const SECRET_KEY =
  'sk_test_51LLqmtH8Bu4sbaZfofNA776ESH1U3jJTXU5itrs9Vg2iZgkQVXSEWa090WI6ebG44BoVjP9vsiBcJVV092JDDwb100ZFXvY6B6';
const Stripe = require('stripe');
const stripe = Stripe(SECRET_KEY);
const {
  User,
  Nationality,
  Account,
  SavingAccount,
  RegisterRecharge,
  RegisterTransaction,
  RegisterCrypto,
  RegisterLockedStake,
} = require('../db.js');

const allUsers = async () => {
  let users = await User.findAll({
    include: [
      {
        model: Account,
        attributes: ['cbu', 'alias'],
      },
    ],
  });

  users = users.map((u) => {
    return {
      id: u.id,
      image: u.image,
      name: u.name,
      lastName: u.lastName,
      email: u.email,
      cbu: u.Account.cbu,
      alias: u.Account.alias,
    };
  });

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
    balance: Number(account.balance),
    role: detail.role,
    state: detail.state,
  };
  console.log(allDetail);

  return allDetail;
};

const userRecharge = async (amount, detail) => {
  const account = await Account.findByPk(detail.AccountId);
  const saving = await SavingAccount.findByPk(account.SavingAccountId);

  if (!account) throw new Error({ message: 'Account not found' });
  if (amount < 100)
    throw new Error({ message: 'Amount must be greater than 100' });

  const newBalance = Number(account.balance) + Number(amount);
  await account.update({ balance: newBalance });
  await saving.update({ ars: newBalance });

  await RegisterRecharge.create({
    account: detail.AccountId,
    amount: amount,
  });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'ars',
    payment_method_types: ['card'], //by default
  });

  const clientSecret = paymentIntent.client_secret;

  return { message: 'Recharge successful', clientSecret: clientSecret };
};

const userMovements = async (detail) => {
  let recharges = await RegisterRecharge.findAll({
    where: { account: detail.AccountId },
  });

  recharges = recharges.map((t) => {
    let date = `${t.date.getDate()}/${
      t.date.getMonth() + 1
    }/${t.date.getFullYear()}`;
    let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

    return {
      idOp: t.id,
      ['image-icon-paper']: 'plus-circle-outline',
      amount: `+${t.amount}`,
      date: date,
      hour: hour,
    };
  });

  let transactionsSent = await RegisterTransaction.findAll({
    where: { accountOrigin: detail.AccountId },
  });

  transactionsSent = await Promise.all(
    transactionsSent.map(async (t) => {
      let accountDestiny = await Account.findByPk(t.accountDestiny);
      let date = `${t.date.getDate()}/${
        t.date.getMonth() + 1
      }/${t.date.getFullYear()}`;
      let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

      return {
        idOp: t.id,
        ['image-icon-paper']: 'arrow-left-bold-circle-outline',
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
    transactionsReceived.map(async (t) => {
      let accountOrigin = await Account.findByPk(t.accountOrigin);
      let date = `${t.date.getDate()}/${
        t.date.getMonth() + 1
      }/${t.date.getFullYear()}`;
      let hour = `${t.date.getHours()}:${t.date.getMinutes()}:${t.date.getSeconds()}`;

      return {
        idOp: t.id,
        ['image-icon-paper']: 'arrow-right-bold-circle-outline',
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

  const registerCrypto = await RegisterCrypto.findAll({
    where: { account: detail.AccountId },
  });

  let buyCrypto = registerCrypto.filter((b) => b.transactionType === 'Buy');

  buyCrypto = await Promise.all(
    buyCrypto.map(async (b) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${b.nameCrypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      let date = `${b.date.getDate()}/${
        b.date.getMonth() + 1
      }/${b.date.getFullYear()}`;
      let hour = `${b.date.getHours()}:${b.date.getMinutes()}:${b.date.getSeconds()}`;

      return {
        id: b.id,
        ['image-icon-paper']: 'arrow-left-bold-circle-outline',
        image: response.data.image,
        name: b.nameCrypto,
        amount: `-${b.amount}`,
        date: date,
        hour: hour,
      };
    })
  );

  let sellCrypto = registerCrypto.filter((b) => b.transactionType === 'Sell');

  sellCrypto = await Promise.all(
    sellCrypto.map(async (b) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${b.nameCrypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      let date = `${b.date.getDate()}/${
        b.date.getMonth() + 1
      }/${b.date.getFullYear()}`;
      let hour = `${b.date.getHours()}:${b.date.getMinutes()}:${b.date.getSeconds()}`;

      return {
        id: b.id,
        ['image-icon-paper']: 'arrow-right-bold-circle-outline',
        image: response.data.image,
        name: b.nameCrypto,
        amount: `+${Number(b.amount) * Number(b.price) * 250}`,
        date: date,
        hour: hour,
      };
    })
  );

  const registerLockedStake = await RegisterLockedStake.findAll({
    where: { account: detail.AccountId },
  });

  let pendingLockedStake = registerLockedStake.filter(
    (r) => r.transactionType === 'pending'
  );

  pendingLockedStake = pendingLockedStake.map((r) => {
    let date = `${r.start_date.getDate()}/${
      r.start_date.getMonth() + 1
    }/${r.start_date.getFullYear()}`;
    let hour = `${r.start_date.getHours()-3}:${r.start_date.getMinutes()}:${r.start_date.getSeconds()}`;

    return {
      idOp: r.id,
      ['image-icon-paper']: 'arrow-left-bold-circle-outline',
      amount: `-${r.deposit}`,
      date: date,
      hour: hour,
    };
  });

  let finalizedLockedStake = registerLockedStake.filter(
    (r) => r.transactionType === 'finalized'
  );

  finalizedLockedStake = finalizedLockedStake.map((r) => {
    let date = r.end_date.split(' ')[0];
    let hour = r.end_date.split(' ')[1];
    return {
      idOp: r.id,
      ['image-icon-paper']: 'arrow-right-bold-circle-outline',
      amount: `+${r.deposit}`,
      date: date,
      hour: hour,
    };
  });

  let movements = {
    recharges: recharges,
    transactionsReceived: transactionsReceived,
    transactionsSent: transactionsSent,
    buyCrypto: buyCrypto,
    sellCrypto: sellCrypto,
    pendingLockedStake: pendingLockedStake,
    finalizedLockedStake: finalizedLockedStake,
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
    try {
      const userDetail = await detailUser(req.user.dataValues);
      res.send(userDetail);
    } catch (error) {
      console.log(error.message);
    }
  },

  userRecharge: async (req, res) => {
    try {
      const recharge = await userRecharge(req.body.amount, req.user.dataValues);
      res.send(recharge);
    } catch (error) {
      console.log(error.message);
    }
  },

  userMovements: async (req, res) => {
    try {
      const movements = await userMovements(req.user.dataValues);
      res.send(movements);
    } catch (error) {
      console.log(error.message);
    }
  },

  userEditProfileImage: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.user.dataValues.id },
      });

      user.update({
        image: req.body.image,
      });

      res.send('Imagen actualizada');
    } catch (error) {
      console.log(error.message);
    }
  },
};

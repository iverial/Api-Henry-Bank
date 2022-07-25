const {
  LockedStake,
  RegisterTransaction,
  RegisterCrypto,
  User,
} = require('../db.js');

const { Op } = require('sequelize');

const registerLockedStake = async (email) => {
  const account = await User.findOne({
    where: {
      email,
    },
  });

  const lockedStake = await LockedStake.findAll({
    where: {
      account: account.AccountId,
    },
  });

  return lockedStake;
};

const registerTransaction = async (email) => {
  const account = await User.findOne({
    where: {
      email,
    },
  });

  // Get all transactions of the user where account.AccountId matches the column accountOrigin or accountDestiny
  const transactions = await RegisterTransaction.findAll({
    where: {
      [Op.or]: [
        { accountOrigin: account.AccountId },
        { accountDestiny: account.AccountId },
      ],
    },
  });

  return transactions;
};

const registerCryptos = async (email) => {
  const account = await User.findOne({
    where: {
      email,
    },
  });

  const allRegisters = await RegisterCrypto.findAll({
    where: {
      account: account.AccountId,
    },
  });

  return allRegisters;
};

module.exports = {
  registerLockedStake: async (req, res) => {
    try {
      const email = req.query.email;
      const response = await registerLockedStake(email);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  registerTransaction: async (req, res) => {
    try {
      const email = req.query.email;
      const response = await registerTransaction(email);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  registerCryptos: async (req, res) => {
    try {
      const email = req.query.email;
      const response = await registerCryptos(email);
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  enableUser: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404).send('el usuario no existe');
      } else {
        await user.update({
          state: 'online',
        });
        res.send('cuenta habilitada con exito.');
      }
    } catch (error) {
      res.send(error.message);
    }
  },

  disabledUser: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404).send('el usuario no existe');
      } else {
        await user.update({
          state: 'disabled',
        });
        res.send('cuenta deshabilitada con exito.');
      }
    } catch (error) {
      res.send(error.message);
    }
  },

  userToAdmin: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404).send('el usuario no existe');
      } else {
        await user.update({
          role: 'admin',
        });
        res.send('cuenta convertida en admin con exito.');
      }
    } catch (error) {
      res.send(error.message);
    }
  },

  adminToUser: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(404).send('el usuario no existe');
      } else {
        await user.update({
          role: 'user',
        });
        res.send('cuenta convertida en usuario correctamente.');
      }
    } catch (error) {
      res.send(error.message);
    }
  },
};

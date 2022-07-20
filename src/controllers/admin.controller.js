const { LockedStake, RegisterTransaction } = require('../db.js');

const registerLockedStake = async () => {
  const allRegisters = await LockedStake.findAll();

  return allRegisters;
};

const registerTransaction = async () => {
  const allRegisters = await RegisterTransaction.findAll();

  return allRegisters;
};

module.exports = {
  registerLockedStake: async (req, res) => {
    try {
      const response = await registerLockedStake();
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  registerTransaction: async (req, res) => {
    try {
      const response = await registerTransaction();
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },
};

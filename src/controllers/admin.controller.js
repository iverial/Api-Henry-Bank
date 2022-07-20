const {
  LockedStake,
  RegisterTransaction,
  RegisterCrypto,
} = require('../db.js');

const registerLockedStake = async () => {
  const allRegisters = await LockedStake.findAll();

  return allRegisters;
};

const registerTransaction = async () => {
  const allRegisters = await RegisterTransaction.findAll();

  return allRegisters;
};

const registerCryptos = async () => {
  const allRegisters = await RegisterCrypto.findAll();

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

  registerCryptos: async (req, res) => {
    try {
      const response = await registerCryptos();
      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
    }
  },

  disabledUser: async (req, res) => {
    try {
      const { email } = req.body
      let user = await User.findOne({where: {email: email}})
      if(!user){
        res.status(404).send("el usuario no existe")
      } else {
        await user.update({
       state: 'disabled'
   })
     res.send("cuenta deshabilitada con exito.")  
   }
    } catch (error) {
       res.send(error.message) 
    }
  }  
};

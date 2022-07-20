const {
  LockedStake,
  RegisterTransaction,
  RegisterCrypto,
  User,
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

  enableUser: async (req, res) => {
    try {
      const { email } = req.body
      let user = await User.findOne({where: {email: email}})
      if(!user){
        res.status(404).send("el usuario no existe")
      } else {
        await user.update({
       state: 'online'
   })
     res.send("cuenta habilitada con exito.")  
   }
    } catch (error) {
       res.send(error.message) 
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
  },
  
  userToAdmin: async (req, res) => {
    try {
      const { email } = req.body
      let user = await User.findOne({where: {email: email}})
      if(!user){
        res.status(404).send("el usuario no existe")
      } else {
        await user.update({
       role: 'admin'
   })
     res.send("cuenta convertida en admin con exito.")  
   }
    } catch (error) {
       res.send(error.message) 
    }
  },

  adminToUser: async (req, res) => {
    try {
      const { email } = req.body
      let user = await User.findOne({where: {email: email}})
      if(!user){
        res.status(404).send("el usuario no existe")
      } else {
        await user.update({
       role: 'user'
   })
     res.send("cuenta convertida en usuario correctamente.")  
   }
    } catch (error) {
       res.send(error.message) 
    }
  },


};

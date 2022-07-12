const { User, Nationality, Account } = require('../db.js');

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

  return allDetail;
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
};

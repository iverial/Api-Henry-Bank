const axios = require('axios');
const {
  Account,
  SavingAccount,
  Crypto,
  RegisterCrypto,
  User,
} = require('../db.js');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_SEND_KEY);

const cryptoList = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'matic-network',
  'solana',
  'pax-gold',
  'tether',
  'tether-eurt',
];

const allCryptos = async () => {
  const allCryptos = await Promise.all(
    cryptoList.map(async (crypto) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      return {
        id: response.data.id,
        symbol: response.data.symbol,
        name: response.data.name,
        image: response.data.image,
        current_price: response.data.market_data.current_price.usd,
        price_change_percentage_24h:
          response.data.market_data.price_change_percentage_24h,
        price_change_percentage_7d:
          response.data.market_data.price_change_percentage_7d,
        price_change_percentage_30d:
          response.data.market_data.price_change_percentage_30d,
        price_change_percentage_1y:
          response.data.market_data.price_change_percentage_1y,
        last_updated: response.data.last_updated,
      };
    })
  );

  allCryptos[5].name = 'Oro Fisico';
  allCryptos[6].name = 'Euro';
  allCryptos[7].name = 'Dolar';

  return allCryptos;
};

//##############################################################
// Get Crypto prices para graficar
//##############################################################

const getCryptoPrices = async (crypto) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=30&interval=daily`
  );

  const prices = response.data.prices.map((price) => {
    return Math.round(price[1] * 100) / 100;
  });

  return prices;
};

//##############################################################
//Buy Crypto
//##############################################################

const buyCrypto = async (amount, crypto, price, AccountId) => {
  amount = Number(amount);
  price = Number(price);
  const dolar = 250;
  const cryptoAmount = amount / dolar / price;

  const account = await Account.findOne({ where: { id: AccountId } });
  const savingAccount = await SavingAccount.findOne({
    where: { id: account.SavingAccountId },
  });

  if (savingAccount.ars < amount) return { msg: 'Fondos insuficientes' };

  // Actualizar el balance del usuario
  const updateAmount = savingAccount.ars - Number(amount);

  await savingAccount.update({
    ars: updateAmount,
  });
  await account.update({
    balance: updateAmount,
  });

  const cryptoInstance = await Crypto.findOne({
    where: {
      SavingAccountId: account.SavingAccountId,
      name: crypto,
    },
  });

  if (cryptoInstance) {
    const mediumPrice =
      (Number(cryptoInstance.buyPrice) * Number(cryptoInstance.balance) +
        cryptoAmount * price) /
      (Number(cryptoInstance.balance) + cryptoAmount);

    const newAmount = Number(cryptoInstance.balance) + Number(cryptoAmount);
    await cryptoInstance.update({
      balance: newAmount,
      buyPrice: mediumPrice,
    });
    // ACA SE REGISTRA LA COMPRA DE CRYPTO
    await RegisterCrypto.create({
      account: AccountId,
      transactionType: 'Buy',
      nameCrypto: crypto,
      price: Number(price),
      amount: amount,
    });

    const emailUser = await User.findOne({
      where: { AccountId: account.id },
    });

    console.log(emailUser);

    const msg = {
      to: emailUser.email,
      from: 'henrybank.proyect@gmail.com',
      subject: 'HenryBank Compra de Crypto',
      text: `Hola ${emailUser.name}, has comprado ${cryptoAmount} ${crypto} a un precio de ${price} dolares`,
      html: `<h1>Hola ${emailUser.name}, has comprado ${cryptoAmount} ${crypto} a un precio de ${price} dolares</h1>`,
    };
    sgMail.send(msg);
    return { msg: 'Crypto Comprada' };
  } else {
    const cryptoNewInstance = await Crypto.create({
      name: crypto,
      balance: Number(cryptoAmount),
      buyPrice: Number(price),
    });

    await savingAccount.addCrypto(cryptoNewInstance);

    // ACA SE REGISTRA LA COMPRA DE CRYPTO
    await RegisterCrypto.create({
      account: AccountId,
      nameCrypto: crypto,
      transactionType: 'Buy',
      price: Number(price),
      amount: amount,
    });

    const emailUser = await User.findOne({
      where: { AccountId: account.id },
    });

    console.log(emailUser);

    const msg = {
      to: emailUser.email,
      from: 'henrybank.proyect@gmail.com',
      subject: 'HenryBank Compra de Crypto',
      text: `Hola ${emailUser.name}, has comprado ${cryptoAmount} ${crypto} a un precio de ${price} dolares`,
      html: `<h1>Hola ${emailUser.name}, has comprado ${cryptoAmount} ${crypto} a un precio de ${price} dolares</h1>`,
    };
    sgMail.send(msg);
    return { msg: 'Nueva Crypto Comprada' };
  }
};

//##############################################################
// Sell Crypto
//##############################################################
const sellCrypto = async (amount, crypto, price, AccountId) => {
  amount = Number(amount);
  price = Number(price);
  const dolar = 250;
  const cryptoAmount = amount * dolar * price;

  const account = await Account.findOne({ where: { id: AccountId } });
  const savingAccount = await SavingAccount.findOne({
    where: { id: account.SavingAccountId },
  });

  const cryptoInstance = await Crypto.findOne({
    where: {
      SavingAccountId: account.SavingAccountId,
      name: crypto,
    },
  });

  if (cryptoInstance && cryptoInstance.balance < amount)
    return { msg: 'Balance de crypto insuficiente' };

  // Actualizar el balance del usuario
  const updateAmount = Number(savingAccount.ars) + Number(cryptoAmount);

  await savingAccount.update({
    ars: updateAmount,
  });
  await account.update({
    balance: updateAmount,
  });

  if (cryptoInstance) {
    const newAmount = Number(cryptoInstance.balance) - Number(amount);
    await cryptoInstance.update({
      balance: newAmount,
    });

    await RegisterCrypto.create({
      account: AccountId,
      transactionType: 'Sell',
      nameCrypto: crypto,
      price: Number(price),
      amount: amount,
    });

    const emailUser = await User.findOne({
      where: { AccountId: account.id },
    });
    const msg = {
      to: emailUser.email,
      from: 'henrybank.proyect@gmail.com',
      subject: 'Venta de Crypto',
      text: `Hola ${emailUser.name}, has vendido ${amount} ${crypto} a un precio de ${price} dolares`,
      html: `<h1>Hola ${emailUser.name}, has vendido ${amount} ${crypto} a un precio de ${price} dolares</h1>`,
    };
    sgMail.send(msg);
    return { msg: 'HenryBank Crypto Vendida' };
  } else {
    return { msg: 'No se encontro la crypto, corrobora datos' };
  }
};

//##############################################################
// Profile Balance ver el balance de las cryptos de un usuario
//##############################################################

const profileBalance = async (AccountId) => {
  const account = await Account.findOne({ where: { id: AccountId } });
  const savingAccount = await SavingAccount.findOne({
    where: { id: account.SavingAccountId },
  });

  const cryptoAll = await Crypto.findAll({
    where: {
      SavingAccountId: account.SavingAccountId,
    },
  });

  const cryptoList = cryptoAll.map((crypto) => {
    return {
      name: crypto.name,
      balance: crypto.balance,
      buyPrice: crypto.buyPrice,
    };
  });

  return cryptoList;
};

module.exports = {
  crypto: async (req, res) => {
    try {
      const response = await allCryptos();
      res.status(200).json(response);
    } catch (error) {
      res.status(404).console.log(error.message);
    }
  },

  profileBalance: async (req, res) => {
    try {
      const { AccountId } = req.user;
      const response = await profileBalance(AccountId);
      res.send(response);
    } catch (error) {
      res.status(404).console.log(error.message);
    }
  },
  buyCrypto: async (req, res) => {
    try {
      const { amount, crypto, price } = req.body;
      const { AccountId } = req.user;
      const resp = await buyCrypto(amount, crypto, price, AccountId);
      res.json(resp);
    } catch (error) {
      res.status(404).console.log(error.message);
    }
  },

  sellCrypto: async (req, res) => {
    try {
      const { amount, crypto, price } = req.body;
      const { AccountId } = req.user;

      const resp = await sellCrypto(amount, crypto, price, AccountId);
      res.json(resp);
    } catch (error) {
      res.status(404).console.log('error: error.message ');
    }
  },

  getCryptoPrices: async (req, res) => {
    try {
      const { crypto } = req.params;
      const response = await getCryptoPrices(crypto);
      res.send(response);
    } catch (error) {
      console.log(error.message);
    }
  },
};

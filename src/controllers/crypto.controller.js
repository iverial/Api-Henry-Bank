const axios = require('axios');

const cryptoList = [
  'huobi-btc',
  'wrapped-bitcoin',
  'bitcoin',
  'pax-gold',
  'tether-gold',
  'ethereum',
  'staked-ether',
  'maker',
  'binancecoin',
  'monero',
];

const allCryptos = async () => {
  const allCryptos = await Promise.all(
    cryptoList.map(async crypto => {
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

  return allCryptos;
};

module.exports = {
  crypto: async (req, res) => {
    const response = await allCryptos();

    res.status(200).json(response);
  },
};

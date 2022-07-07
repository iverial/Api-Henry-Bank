const axios = require('axios');

const allCryptos = async () => {
  let allCryptos = [];

  let url1 =
    'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url2 =
    'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url3 =
    'https://api.coingecko.com/api/v3/coins/tether?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url4 =
    'https://api.coingecko.com/api/v3/coins/usd-coin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url5 =
    'https://api.coingecko.com/api/v3/coins/binancecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url6 =
    'https://api.coingecko.com/api/v3/coins/binance-usd?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url7 =
    'https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url8 =
    'https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url9 =
    'https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let url10 =
    'https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';

  let request1 = axios.get(url1);
  let request2 = axios.get(url2);
  let request3 = axios.get(url3);
  let request4 = axios.get(url4);
  let request5 = axios.get(url5);
  let request6 = axios.get(url6);
  let request7 = axios.get(url7);
  let request8 = axios.get(url8);
  let request9 = axios.get(url9);
  let request10 = axios.get(url10);

  let [
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
    answer8,
    answer9,
    answer10,
  ] = await axios.all([
    request1,
    request2,
    request3,
    request4,
    request5,
    request6,
    request7,
    request8,
    request9,
    request10,
  ]);

  allCryptos = [
    answer1.data,
    answer2.data,
    answer3.data,
    answer4.data,
    answer5.data,
    answer6.data,
    answer7.data,
    answer8.data,
    answer9.data,
    answer10.data,
  ];

  allCryptos = allCryptos.map(c => {
    return {
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.market_data.current_price.usd,
      price_change_percentage_24h: c.market_data.price_change_percentage_24h,
      price_change_percentage_7d: c.market_data.price_change_percentage_7d,
      price_change_percentage_30d: c.market_data.price_change_percentage_30d,
      price_change_percentage_1y: c.market_data.price_change_percentage_1y,
      last_updated: c.last_updated,
    };
  });

  return allCryptos;
};

module.exports = {
  crypto: async (req, res) => {
    const response = await allCryptos();

    res.status(200).json(response);
  },
};

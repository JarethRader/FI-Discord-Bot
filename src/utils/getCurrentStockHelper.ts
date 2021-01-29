import fetch from 'node-fetch';

const getCurrentPriceHelper = (ticker: string) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1d&interval=1m`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.chart.result[0].meta.regularMarketPrice === undefined) {
          throw new Error('Invalid Ticker');
        }
        resolve([
          json.chart.result[0].meta.regularMarketPrice,
          json.chart.result[0].meta.currency,
          json.chart.result[0].meta.exchangeName,
        ]);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default getCurrentPriceHelper;

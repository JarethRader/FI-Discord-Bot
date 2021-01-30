import fetch from 'node-fetch';

const get52WeekAveHelper = (ticker: string) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.chart.result[0].meta.regularMarketPrice === undefined) {
          throw new Error('Invalid Ticker');
        }
        const sumAdjClose = json.chart.result[0].indicators.adjclose[0].adjclose.reduce(
          (acc: number, cur: number) => acc + cur
        );
        const avg =
          sumAdjClose /
          json.chart.result[0].indicators.adjclose[0].adjclose.length;

        resolve(avg);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default get52WeekAveHelper;

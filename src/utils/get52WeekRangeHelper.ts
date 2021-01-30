import fetch from 'node-fetch';

const get52WeekRangeHelper = (ticker: string) => {
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
        const yearlyLow = Math.min(
          ...json.chart.result[0].indicators.quote[0].low
        );
        const yearlyHigh = Math.min(
          ...json.chart.result[0].indicators.quote[0].high
        );
        const yearlyRange = `$${yearlyLow
          .toFixed(2)
          .toString()} - $${yearlyHigh.toFixed(2).toString()}`;

        resolve(yearlyRange);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default get52WeekRangeHelper;

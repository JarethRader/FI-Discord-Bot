import fetch from 'node-fetch';

declare global {
  interface ISummary {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    afterHours: string;
    preMarket: string;
  }
}

const getDailyOpenCloseHelper = (
  ticker: string,
  apiKey: string,
  date: string
) => {
  return new Promise<ISummary>(async (resolve, reject) => {
    await fetch(
      `https://api.polygon.io/v1/open-close/${ticker.toUpperCase()}/${date}?unadjusted=true&apiKey=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const summary: ISummary = {
          open: json.open.toFixed(2),
          high: json.high.toFixed(2),
          low: json.low.toFixed(2),
          close: json.close.toFixed(2),
          volume: json.volume,
          afterHours: json.afterHours.toFixed(2),
          preMarket: json.preMarket.toFixed(2),
        };
        resolve(summary);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default getDailyOpenCloseHelper;

import fetch from 'node-fetch';

declare global {
  interface IFundamentals {
    previousClose: string;
    open: string;
    bid: string;
    ask: string;
    dayRange: string;
    yearRange: string;
    volume: string;
    avgVolume: string;
    marketCap: string;
    beta: string;
    epRatio: string;
    eps: string;
    forwardDivYield: string;
    exDivDate: string;
  }
}

const getFundamentalsHelper = (ticker: string) => {
  return new Promise<IFundamentals>(async (resolve, reject) => {
    await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price%2CsummaryDetail`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.quoteSummary.result[0].summaryDetail === undefined) {
          throw new Error('Invalid Ticker');
        }

        const forwardDivYield =
          json.quoteSummary.result[0].summaryDetail.dividendRate.raw ===
          undefined
            ? 'N/A'
            : `${json.quoteSummary.result[0].summaryDetail.dividendRate.fmt} (${json.quoteSummary.result[0].summaryDetail.dividendYield.fmt})`;

        const exDivDate =
          json.quoteSummary.result[0].summaryDetail.exDividendDate.raw ===
          undefined
            ? 'N/A'
            : json.quoteSummary.result[0].summaryDetail.exDividendDate.fmt;

        const epRatio =
          json.quoteSummary.result[0].summaryDetail.trailingPE === undefined
            ? 'N/A'
            : json.quoteSummary.result[0].summaryDetail.trailingPE.fmt;

        const eps =
          json.quoteSummary.result[0].summaryDetail.trailingPE === undefined
            ? 'N/A'
            : `${(
                json.quoteSummary.result[0].price.regularMarketPrice.raw /
                json.quoteSummary.result[0].summaryDetail.trailingPE.raw
              ).toFixed(2)}`;

        const fundamentals: IFundamentals = {
          previousClose:
            json.quoteSummary.result[0].summaryDetail.previousClose.fmt,
          open: json.quoteSummary.result[0].summaryDetail.open.fmt,
          bid: `${json.quoteSummary.result[0].summaryDetail.bid.fmt} x ${json.quoteSummary.result[0].summaryDetail.bidSize.fmt}`,
          ask: `${json.quoteSummary.result[0].summaryDetail.ask.fmt} x ${json.quoteSummary.result[0].summaryDetail.askSize.fmt}`,
          dayRange: `${json.quoteSummary.result[0].summaryDetail.dayLow.fmt} - ${json.quoteSummary.result[0].summaryDetail.dayHigh.fmt}`,
          yearRange: `${json.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.fmt} - ${json.quoteSummary.result[0].summaryDetail.fiftyTwoWeekHigh.fmt}`,
          volume: json.quoteSummary.result[0].summaryDetail.volume.fmt,
          avgVolume:
            json.quoteSummary.result[0].summaryDetail.averageVolume.fmt,
          marketCap: json.quoteSummary.result[0].summaryDetail.marketCap.fmt,
          beta: json.quoteSummary.result[0].summaryDetail.beta.fmt,
          epRatio,
          eps,
          forwardDivYield,
          exDivDate,
        };
        resolve(fundamentals);
      })
      .catch((err: Error) => {
        reject(err.message);
      });
  });
};

export default getFundamentalsHelper;

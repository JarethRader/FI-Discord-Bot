import Discord from 'discord.js';

const buildGetFundamentalData = (
  getFundamentalsHelper: (ticker: string) => Promise<any>
) => {
  const getFundamentalData = {
    name: 'get-fundamental-data',
    description: 'Get the latest listing price of a stock',
    args: true,
    usage: '<stock symbol>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        if (args.length !== 1) {
          throw new Error(`Expected 1 argument, ${args.length} provided`);
        } else if (typeof args[0] !== 'string') {
          throw new Error(
            `Expected a ticker, you provided an ${typeof args[0]}`
          );
        }
        getFundamentalsHelper(args[0])
          .then((response: IFundamentals) => {
            message.channel.send(
              `Fundamental Data for ${args[0].toUpperCase()}:\nPrevious Close: ${
                response.previousClose
              },\nOpen: ${response.open},\nBid: ${response.bid},\nAsk: ${
                response.ask
              },\nDay's Range: ${response.dayRange},\n52-Week Range: ${
                response.yearRange
              },\nVolume: ${response.volume},\nAverage Volume: ${
                response.avgVolume
              },\nMarket Cap: ${response.marketCap},\nBeta (5Y Monthly): ${
                response.beta
              },\nEP Ratio: ${response.epRatio},\nEPS: ${
                response.eps
              },\nForward Dividend & Yield: ${
                response.forwardDivYield
              },\nEx-Dividend Date: ${response.exDivDate}
              `
            );
          })
          .catch((err) => {
            message.channel.send(`An error has occured: ${err}`);
          });
      } catch (err) {
        message.channel.send(`An error has occured: ${err}`);
      }
    },
  };
  return getFundamentalData;
};

export default buildGetFundamentalData;

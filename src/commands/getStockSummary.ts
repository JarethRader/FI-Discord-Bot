import Discord from 'discord.js';

const buildGetStockSummary = (
  get52WeekRangeHelper: (ticker: string) => Promise<any>,
  getDailyOpenCloseHelper: (
    ticker: string,
    apiKey: string,
    date: string
  ) => Promise<any>,
  apiKey: string
) => {
  const getStockSummary = {
    name: 'get-stock-summary',
    description: 'Get 52 week high, low, open and close prices for a stock',
    args: true,
    usage: '<stock symbol>',
    cooldown: '12',
    execute: async (message: Discord.Message, args: string[]) => {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const date = yyyy + '-' + mm + '-' + dd;

      const range = await get52WeekRangeHelper(args[0]).then(
        (Response) => Response
      );
      const summary: ISummary = await getDailyOpenCloseHelper(
        args[0],
        apiKey,
        date
      ).then((Response) => Response);
      message.channel.send(
        `
        Summary of ${args[0].toUpperCase()} for ${date} \n52-Week Range: ${range}\nOpen: $${
          summary.open
        }\nClose: $${summary.close}\nHigh: $${summary.high}\nLow: $${
          summary.low
        }\nVolume: ${summary.volume}\nAfterHours: $${
          summary.afterHours
        }\nPreMarket: $${summary.preMarket}
        `
      );
    },
  };
  return getStockSummary;
};

export default buildGetStockSummary;

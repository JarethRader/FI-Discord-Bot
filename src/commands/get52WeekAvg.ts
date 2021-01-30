import Discord from 'discord.js';

const buildGet52WeekAvg = (
  get52WeekAvgHelper: (ticker: string) => Promise<any>
) => {
  const get52WeekAvg = {
    name: 'get-52-week-avg',
    description: 'Get the 52 week average for a stock',
    args: true,
    usage: '<stock symbol>',
    cooldown: '12',
    execute: (message: Discord.Message, args: string[]) => {
      get52WeekAvgHelper(args[0])
        .then((response) => {
          message.channel.send(
            `The 52 week average for ${args[0].toUpperCase()} is ${response}`
          );
        })
        .catch((err) => {
          message.channel.send(`An error has occured: ${err}`);
        });
    },
  };
  return get52WeekAvg;
};

export default buildGet52WeekAvg;

import Discord from 'discord.js';

const buildGetCurrent = (getCurrentStock: (ticker: string) => Promise<any>) => {
  const getCurrent = {
    name: 'get-current-stock',
    description: 'Get the latest listing price of a stock',
    args: true,
    usage: '<stock symbol>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        getCurrentStock(args[0])
          .then((response) => {
            message.channel.send(
              `The most recent trading price of ${args[0].toUpperCase()} on the ${
                response[2]
              } is ${response[0]} in ${response[1]}`
            );
          })
          .catch((err) => {
            message.channel.send(`An error has occured: ${err}`);
            return;
          });
      } catch (err) {
        message.channel.send(`An error has occured: ${err}`);
      }
    },
  };
  return getCurrent;
};

export default buildGetCurrent;

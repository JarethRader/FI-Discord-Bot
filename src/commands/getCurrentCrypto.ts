import Discord from 'discord.js';

const buildGetCrypto = (getCurrentCrypto: (ticker: string) => Promise<any>) => {
  const getCurrent = {
    name: 'get-current-crypto',
    description: 'Get the latest trading price of a cryptocurrency',
    args: true,
    usage: '<stock symbol>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        getCurrentCrypto(args[0])
          .then((response) => {
            message.channel.send(
              `The most recent trading price of ${args[0].toUpperCase()} on Coinbase is ${
                response[0]
              } in ${response[1]}`
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

export default buildGetCrypto;

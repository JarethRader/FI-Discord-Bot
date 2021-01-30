import Discord from 'discord.js';

const buildCreateAlert = (
  createAlertHelper: (
    ticker: string,
    price: string,
    currentPrice: string,
    author: string,
    ping: AlertPing
  ) => Promise<any>,
  getCurrentStock: (ticker: string) => Promise<any>
) => {
  const createAlert = {
    name: 'create-alert',
    description:
      'Create a new alert for if a stock reachs a certain price. Optionally can choose to only alert yourself, alerts will mention @everyone by default if this option is not given. Alerts only currently work for traditional stocks.',
    args: true,
    usage: '<stock symbol> <price> <me | everyone>(optional)',
    cooldown: '15',
    execute: (message: Discord.Message, args: string[]) => {
      let ping: AlertPing;
      if (args[2]) {
        args[2] !== 'everyone' ? (ping = 'self') : (ping = 'everyone');
      }
      getCurrentStock(args[0]).then((currentPrice) => {
        createAlertHelper(
          args[0],
          args[1],
          currentPrice,
          `<@${message.author.id}>`,
          ping
        );

        const messagePing = ping === 'self' ? message.author : '@everyone';
        message.channel.send(
          `Created a new alert for ${args[0].toUpperCase()} if it reaches $${
            args[1]
          } for ${messagePing}`
        );
      });
    },
  };
  return createAlert;
};

export default buildCreateAlert;

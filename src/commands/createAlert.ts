import Discord from 'discord.js';

const buildCreateAlert = (
  createAlertHelper: (
    ticker: string,
    price: string,
    author: string
  ) => Promise<any>
) => {
  const createAlert = {
    name: 'create-alert',
    description:
      'Create a new alert for if a stock reachs a certain price. Alerts only currently work for traditional stocks.',
    args: true,
    usage: '<stock symbol> <price>',
    cooldown: '15',
    execute: (message: Discord.Message, args: string[]) => {
      createAlertHelper(args[0], args[1], `<@${message.author.id}>`);
      message.channel.send(
        `Created a new alert for ${args[0]} if it reaches $${args[1]} for ${message.author}`
      );
    },
  };
  return createAlert;
};

export default buildCreateAlert;

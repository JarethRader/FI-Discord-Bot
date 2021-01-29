import Discord from 'discord.js';

const buildAddWatch = (getCurrentStock: (ticker: string) => Promise<any>) => {
  const addWatch = {
    name: 'add-watch',
    description: 'Add a new stock to watch list',
    args: true,
    usage: '<stock symbol> ...',
    cooldown: '12',
    execute: (message: Discord.Message, args: string[]) => {
      getCurrentStock(args[0]).then((response) => {
        console.log(response);
      });
      message.channel.send(`Adding ${args[0]} to watch list`);
    },
  };
  return addWatch;
};

export default buildAddWatch;

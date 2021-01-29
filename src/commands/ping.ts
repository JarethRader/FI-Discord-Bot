import Discord from 'discord.js';

const buildPing = () => {
  const ping = {
    name: 'ping',
    description: 'Ping!',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      message.channel.send('Pong.');
    },
  };
  return ping;
};

export default buildPing;

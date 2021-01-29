import Discord from 'discord.js';
import config from '../config.json';
const prefix = config.prefix;

const Help = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  execute: (message: any, args: string[]) => {
    const data = [];
    // ts-ignore
    const { commands } = message.client;

    if (!args.length) {
      data.push("Here's a list of all my commands:");
      data.push(commands.map((command: any) => command.name).join(', '));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );

      return message.channel
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          //   message.reply('Here is a list of all my commands!');
        })
        .catch((error: Error) => {
          console.error(`Could not send message \n`, error);
          message.reply("it seems like I can't send this help message");
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c: any) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  },
};

export default Help;

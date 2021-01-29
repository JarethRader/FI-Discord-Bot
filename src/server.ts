import Discord from 'discord.js';

import checkAlerts from './tasks/alertScheduler';
import utilityFunctions from './utils';

// Load environment variables
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

export const envConfig = dotenv.parse(
  fs.readFileSync(path.resolve(__dirname, './.env'))
);

// load configuration file
import config from './config.json';

// initialize mongodb
import mongoose from 'mongoose';

mongoose
  .connect(envConfig['MONGO_URI'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// initialize bot
const client: any = new Discord.Client();

// initilize collections
client.commands = new Discord.Collection();
const cooldowns: any = new Discord.Collection();

client.once('ready', () => {
  console.log('Ready!');
});

import commands from './commands';
Object.entries(commands).map((command) => {
  client.commands.set(command[1].name, command[1]);
});

// check for and send out alerts
checkAlerts(utilityFunctions.getCurrentPriceHelper, client);

client.on('message', (message: Discord.Message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  // @ts-ignore
  const commandName = args.shift().toLowerCase(); // eslint-disable-line no-eval

  if (!client.commands.has(commandName)) {
    console.log('No command found');
    return;
  }

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(envConfig['TOKEN']);

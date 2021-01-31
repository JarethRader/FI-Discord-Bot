import Discord from 'discord.js';

const buildGetNews = (
  getNewsHelper: (ticker: string, apiKey: string) => Promise<any>,
  apiKey: string
) => {
  const getNews = {
    name: 'get-news',
    description: 'Get the recent news articles for a stock',
    args: true,
    usage: '<stock symbol>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        if (args.length !== 1) {
          throw new Error(`Expected 1 argument, ${args.length} provided`);
        }
        getNewsHelper(args[0], apiKey)
          .then((response) => {
            message.channel.send(
              `The most news articles for ${args[0].toUpperCase()} are...`
            );
            response.map((article: Discord.MessageEmbed) => {
              message.channel.send(article);
            });
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
  return getNews;
};

export default buildGetNews;

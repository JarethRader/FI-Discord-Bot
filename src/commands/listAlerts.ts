import Discord from 'discord.js';

const buildListAlerts = (listAlertsHelper: () => Promise<any>) => {
  const listAlerts = {
    name: 'list-alerts',
    description: 'List all alerts that are currently active',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      listAlertsHelper()
        .then((response) => {
          response.map((alert: any) => {
            message.channel.send(
              `ID: ${
                alert.id
              } - Alert for ${alert.ticker.toUpperCase()} at price $${
                alert.price
              }, created by ${alert.author}`
            );
          });
        })
        .catch((err) => {
          message.channel.send(`An error has occured: ${err}`);
        });
    },
  };
  return listAlerts;
};

export default buildListAlerts;

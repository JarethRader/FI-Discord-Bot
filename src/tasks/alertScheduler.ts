import Discord from 'discord.js';
import schedule from 'node-schedule';

import { envConfig } from '../server';

import Alert from '../models/Alerts';

const checkAlerts = (
  getStockPrice: (ticker: string) => Promise<any>,
  deleteAlert: (alertID: string) => Promise<any>,
  client: Discord.Client
) => {
  var j = schedule.scheduleJob('0 * * * * *', async () => {
    for await (const cursor of Alert.find()) {
      getStockPrice(cursor.ticker).then(async (response) => {
        if (
          response[0] / cursor.price > 0.95 &&
          response[0] / cursor.price < 1.05
        ) {
          await client.channels
            .fetch(envConfig['ALERT_CHANNEL_ID'])
            .then((channel) => {
              // @ts-ignore
              channel.send(
                `ALERT ${cursor.author}: ${cursor.ticker} has reached ${cursor.price}. This alert will now be deleted, if you wish to be alerted again, please create a new alert.`
              );
              deleteAlert(cursor._id)
                .then((success) => {
                  // @ts-ignore
                  success && channel.send('Alert successfully deleted');
                })
                .catch((err) => {
                  // @ts-ignore
                  channel.send('Error: Unable to delete alert');
                  console.log(err);
                });
            });
        }
      });
    }
  });
};

export default checkAlerts;

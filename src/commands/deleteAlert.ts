import Discord from 'discord.js';

const buildDeleteAlert = (
  deleteAlertHelper: (alertID: string) => Promise<any>
) => {
  const ping = {
    name: 'delete-alert',
    description: 'Delete and alert',
    args: true,
    usage: '<alert id>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        deleteAlertHelper(args[0])
          .then((success) => {
            success && message.channel.send('Alert was successfully deleted');
          })
          .catch((err) => {
            throw err;
          });
      } catch (err) {
        message.channel.send(`An error has occured: ${err}`);
      }
    },
  };
  return ping;
};

export default buildDeleteAlert;

import Discord from 'discord.js';

const buildDeleteAlert = (
  deleteAlertHelper: (alertID: string) => Promise<any>
) => {
  const ping = {
    name: 'delete-alert',
    description:
      'Delete an alert. user the list-alerts command to find the id for an alert you want to delete',
    args: true,
    usage: '<alert id>',
    cooldown: '5',
    execute: (message: Discord.Message, args: string[]) => {
      try {
        if (args.length !== 1) {
          throw new Error(`Expected 1 argument, ${args.length} provided`);
        }

        deleteAlertHelper(args[0])
          .then((success) => {
            success && message.channel.send('Alert was successfully deleted');
          })
          .catch((err) => {
            message.channel.send(`An error has occured: ${err}`);
          });
      } catch (err) {
        message.channel.send(`An error has occured: ${err}`);
      }
    },
  };
  return ping;
};

export default buildDeleteAlert;

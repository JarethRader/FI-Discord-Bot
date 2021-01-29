import Alert from '../models/Alerts';

const deleteAlertHelper = (alertID: string) => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await Alert.findByIdAndRemove(alertID)
      .then((alert: IAlertModel) => {
        alert && resolve(true);
      })
      .catch((err: Error) => {
        console.log(err);
        reject(new Error(err.message));
      });
  });
};

export default deleteAlertHelper;

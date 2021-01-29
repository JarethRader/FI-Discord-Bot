import Alert from '../models/Alerts';

const createAlertHelper = (ticker: string, price: string, author: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    const alertInfo: IAlert = {
      ticker,
      price: parseInt(price),
      author: author,
    };

    const newAlert: IAlertModel = new Alert(alertInfo);
    try {
      await newAlert.save();
    } catch (err) {
      reject(new Error(err.message));
    }
    resolve(true);
  });
};

export default createAlertHelper;

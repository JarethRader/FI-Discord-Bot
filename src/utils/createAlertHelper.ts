import Alert from '../models/Alerts';

const createAlertHelper = (
  ticker: string,
  price: string,
  currentPrice: string,
  author: string,
  ping?: AlertPing
) => {
  return new Promise<boolean>(async (resolve, reject) => {
    console.log('Creating alert');
    const alertInfo: IAlert = {
      ticker,
      price: parseInt(price),
      author: author,
      currentPrice: parseInt(currentPrice),
      ping: ping ? 'self' : 'everyone',
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

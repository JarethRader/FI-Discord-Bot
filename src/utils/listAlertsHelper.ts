import Alert from '../models/Alerts';

declare global {
  interface IAlertList {
    id: string;
    ticker: string;
    author: string;
    price: string;
  }
}

const listAlertsHelper = () => {
  return new Promise<IAlertList[]>(async (resolve, reject) => {
    try {
      const list: any = [];
      for await (const cursor of Alert.find()) {
        const newAlert = {
          id: cursor._id,
          ticker: cursor.ticker,
          author: cursor.author,
          price: cursor.price,
        };
        list.push(newAlert);
      }
      resolve(list);
    } catch (err) {
      reject(new Error(err.message));
    }
  });
};

export default listAlertsHelper;

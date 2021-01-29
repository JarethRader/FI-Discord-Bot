import fetch from 'node-fetch';
import coinbaseIDs from '../components/coinbaseIds.json';

const getCurrentCryptoHelper = (ticker: string) => {
  return new Promise(async (resolve, reject) => {
    let found = false;
    await coinbaseIDs.coinList.map(async (coinItem) => {
      if (coinItem.coin.toLowerCase() === ticker.toLowerCase()) {
        found = true;
        await fetch(
          `https://www.coinbase.com/api/v2/assets/prices/${coinItem.id}?base=USD&resolution=latest`
        )
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            resolve([json.data.prices.latest, json.data.currency]);
          })
          .catch((err: Error) => {
            reject(err.message);
          });
      }
    });
    if (!found) {
      reject(
        new Error(
          'Crypto ticker is either invaid or not supported by this bot at this time'
        )
      );
    }
  });
};

export default getCurrentCryptoHelper;

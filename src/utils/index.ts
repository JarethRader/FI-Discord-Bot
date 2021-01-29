import getCurrentPriceHelper from './getCurrentStockHelper';
import getCurrentCryptoHelper from './getCurrentCryptoHelper';
import getNewsHelper from './getNewsHelper';
import createAlertHelper from './createAlertHelper';

const utilityFunctions = Object.freeze({
  getCurrentPriceHelper,
  getCurrentCryptoHelper,
  getNewsHelper,
  createAlertHelper,
});

export default utilityFunctions;
export {
  getCurrentPriceHelper,
  getNewsHelper,
  getCurrentCryptoHelper,
  createAlertHelper,
};

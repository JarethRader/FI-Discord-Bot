import getCurrentPriceHelper from './getCurrentStockHelper';
import getCurrentCryptoHelper from './getCurrentCryptoHelper';
import getNewsHelper from './getNewsHelper';
import createAlertHelper from './createAlertHelper';
import deleteAlertHelper from './deleteAlertHelper';

const utilityFunctions = Object.freeze({
  getCurrentPriceHelper,
  getCurrentCryptoHelper,
  getNewsHelper,
  createAlertHelper,
  deleteAlertHelper,
});

export default utilityFunctions;
export {
  getCurrentPriceHelper,
  getNewsHelper,
  getCurrentCryptoHelper,
  createAlertHelper,
  deleteAlertHelper,
};

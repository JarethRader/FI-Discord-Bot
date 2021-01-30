import getCurrentPriceHelper from './getCurrentStockHelper';
import getCurrentCryptoHelper from './getCurrentCryptoHelper';
import getNewsHelper from './getNewsHelper';
import createAlertHelper from './createAlertHelper';
import deleteAlertHelper from './deleteAlertHelper';
import listAlertsHelper from './listAlertsHelper';

const utilityFunctions = Object.freeze({
  getCurrentPriceHelper,
  getCurrentCryptoHelper,
  getNewsHelper,
  createAlertHelper,
  deleteAlertHelper,
  listAlertsHelper,
});

export default utilityFunctions;
export {
  getCurrentPriceHelper,
  getNewsHelper,
  getCurrentCryptoHelper,
  createAlertHelper,
  deleteAlertHelper,
  listAlertsHelper,
};

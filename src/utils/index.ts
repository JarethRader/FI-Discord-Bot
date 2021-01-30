import getCurrentPriceHelper from './getCurrentStockHelper';
import getCurrentCryptoHelper from './getCurrentCryptoHelper';
import getNewsHelper from './getNewsHelper';
import createAlertHelper from './createAlertHelper';
import deleteAlertHelper from './deleteAlertHelper';
import listAlertsHelper from './listAlertsHelper';
import get52WeekAveHelper from './52WeekAverageHelper';

const utilityFunctions = Object.freeze({
  getCurrentPriceHelper,
  getCurrentCryptoHelper,
  getNewsHelper,
  createAlertHelper,
  deleteAlertHelper,
  listAlertsHelper,
  get52WeekAveHelper,
});

export default utilityFunctions;
export {
  getCurrentPriceHelper,
  getNewsHelper,
  getCurrentCryptoHelper,
  createAlertHelper,
  deleteAlertHelper,
  listAlertsHelper,
  get52WeekAveHelper,
};

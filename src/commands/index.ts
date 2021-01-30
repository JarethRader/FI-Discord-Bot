import help from './help';
// import buildAddWatch from './addWatch';
import buildGetStock from './getCurrentStock';
import buildGetCrypto from './getCurrentCrypto';
import buildGetNews from './getNews';
import buildCreateAlert from './createAlert';
import buildDeleteAlert from './deleteAlert';
import buildListAlerts from './listAlerts';
import buildGet52WeekAvg from './get52WeekAvg';

import buildPing from './ping';

import utilityFunctions from '../utils';
import { envConfig } from '../server';

const ping = buildPing();
const getCurrentStock = buildGetStock(utilityFunctions.getCurrentPriceHelper);
const getCurrentCrypto = buildGetCrypto(
  utilityFunctions.getCurrentCryptoHelper
);
const getNews = buildGetNews(
  utilityFunctions.getNewsHelper,
  envConfig['POLYGON_API_KEY']
);
const createAlert = buildCreateAlert(
  utilityFunctions.createAlertHelper,
  utilityFunctions.getCurrentPriceHelper
);
const deleteAlert = buildDeleteAlert(utilityFunctions.deleteAlertHelper);
const listAlerts = buildListAlerts(utilityFunctions.listAlertsHelper);
const get52WeekAvg = buildGet52WeekAvg(utilityFunctions.get52WeekAveHelper);

const commands = Object.freeze({
  help,
  //   addWatch,
  getCurrentStock,
  getCurrentCrypto,
  getNews,
  createAlert,
  deleteAlert,
  listAlerts,
  get52WeekAvg,
  ping,
});

export default commands;
export {
  help,
  getCurrentStock,
  getCurrentCrypto,
  getNews,
  createAlert,
  deleteAlert,
  listAlerts,
  get52WeekAvg,
  ping,
};

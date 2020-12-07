import { MarketType } from '@domain/enums';
import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  tableData: {
    [MarketType.forex]: {
      headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
      rows: [
        ['EURUSD', '206.24', '206.46', '2.15'],
        ['USDJPY', '206.24', '206.46', '2.15'],
        ['GBPUSD', '206.24', '206.46', '2.15'],
        ['USDCHF', '206.24', '206.46', '2.15'],
      ],
    },
    [MarketType.indices]: {
      headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
      rows: [
        ['US 500 Undex CFD', '206.24', '206.46', '2.15'],
        ['US 100 Undex CFD', '206.24', '206.46', '2.15'],
        ['US 30 Undex CFD', '206.24', '206.46', '2.15'],
        ['UK 100 Undex CFD', '206.24', '206.46', '2.15'],
      ],
    },
    [MarketType.stocks]: {
      headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
      rows: [
        ['Tesla Motors', '206.24', '206.46', '2.15'],
        ['Twitter', '206.24', '206.46', '2.15'],
        ['Google', '206.24', '206.46', '2.15'],
        ['Faceboook', '206.24', '206.46', '2.15'],
      ],
    },
    [MarketType.commodities]: {
      headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
      rows: [
        ['SPOT GOLD', '206.24', '206.46', '2.15'],
        ['SPOT SILVER', '206.24', '206.46', '2.15'],
        ['US OIL CFD', '206.24', '206.46', '2.15'],
        ['BRENT CFD', '206.24', '206.46', '2.15'],
      ],
    },
    [MarketType.crypto]: {
      headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
      rows: [
        ['BTCUSD', '206.24', '206.46', '2.15'],
        ['LTCUSD', '206.24', '206.46', '2.15'],
        ['ETHUSD', '206.24', '206.46', '2.15'],
        ['XRPUSD', '206.24', '206.46', '2.15'],
      ],
    },
  },
};

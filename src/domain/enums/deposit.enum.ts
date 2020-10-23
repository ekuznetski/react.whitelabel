import { ECurrencyCode } from './currency.enum';
import { ETradingAccountType } from './domains.enum';

export enum EDepositMethods {
  creditCard = 'visaMastercard',
  neteller = 'neteller',
  webmoney = 'webmoney',
  skrill = 'skrill',
  bankWire = 'bankwire',
}
export enum EDepositMethodCode {
  creditCard = 'CC',
  neteller = 'NT',
  webmoney = 'WM',
  skrill = 'SK',
  bankWire = 'BW',
}

export const MinLimitDeposit: { [k: string]: any } = {
  fake: [
    {
      accType: [ETradingAccountType.classic, ETradingAccountType.fixed],
      ccrLimit: {
        [ECurrencyCode.usd]: 100,
        [ECurrencyCode.cad]: 100,
        [ECurrencyCode.eur]: 100,
        [ECurrencyCode.gbp]: 100,
        [ECurrencyCode.aed]: 370,
        [ECurrencyCode.rub]: 6000,
      },
    },
    {
      accType: [ETradingAccountType.raw],
      ccrLimit: {
        [ECurrencyCode.usd]: 200,
        [ECurrencyCode.cad]: 100,
        [ECurrencyCode.eur]: 200,
        [ECurrencyCode.gbp]: 200,
        [ECurrencyCode.aed]: 740,
        [ECurrencyCode.rub]: 12000,
      },
    },
  ],
  live: [
    {
      accType: [ETradingAccountType.classic, ETradingAccountType.fixed, ETradingAccountType.raw],
      ccrLimit: {
        [ECurrencyCode.usd]: 20,
        [ECurrencyCode.cad]: 20,
        [ECurrencyCode.eur]: 20,
        [ECurrencyCode.gbp]: 20,
        [ECurrencyCode.aed]: 100,
        [ECurrencyCode.rub]: 1200,
      },
    },
  ],
};

export const StaticAmounts = {
  [ECurrencyCode.usd]: [100, 500, 1000, 5000, 10000, 20000, 50000],
  [ECurrencyCode.cad]: [100, 500, 1000, 5000, 10000, 20000, 50000],
  [ECurrencyCode.eur]: [100, 450, 900, 4500, 9000, 18000, 45000],
  [ECurrencyCode.gbp]: [100, 400, 800, 4000, 8000, 16000, 40000],
  [ECurrencyCode.aed]: [370, 1850, 3700, 18500, 37000, 74000, 185000],
  [ECurrencyCode.rub]: [6300, 31500, 63000, 315000, 630000, 1260000, 3150000],
};

export const AllowedCurrToMethodMap: { [k: string]: any } = {
  [EDepositMethods.creditCard]: [
    ECurrencyCode.eur,
    ECurrencyCode.usd,
    ECurrencyCode.gbp,
    ECurrencyCode.aed,
    ECurrencyCode.rub,
  ],
  [EDepositMethods.neteller]: [ECurrencyCode.eur, ECurrencyCode.usd],
  [EDepositMethods.skrill]: [ECurrencyCode.eur, ECurrencyCode.usd, ECurrencyCode.gbp, ECurrencyCode.aed],
  [EDepositMethods.webmoney]: [ECurrencyCode.eur, ECurrencyCode.usd, ECurrencyCode.rub],
  [EDepositMethods.bankWire]: [
    ECurrencyCode.eur,
    ECurrencyCode.usd,
    ECurrencyCode.gbp,
    ECurrencyCode.aed,
    ECurrencyCode.rub,
  ],
};

import { EAssetClass, ETradingPlatform } from '@domain/enums';
import {
  accountTypePip as _accountTypePip,
  assetsCharacteristics as _assetsCharacteristics,
  marketTableContent as _marketTableContent,
} from '@domain/defaultData/marketData.config';

export const assetsCharacteristics = {
  ..._assetsCharacteristics,
  [EAssetClass.forex]: {
    leverage: '1:500',
    spread: '1.4',
    margins: '0.20%',
  },
  [EAssetClass.indices]: {
    leverage: '1:100',
  },
  [EAssetClass.commodities]: {
    leverage: '1:67',
  },
};

export const accountTypePip = {
  ..._accountTypePip,
  variable: 1.4,
  raw: 0.2,
};

export const marketTableContent = Object.keys(_marketTableContent).reduce(
  (acc, key) =>
    Object.assign(acc, {
      [key]: _marketTableContent[key].map((item) => ({
        ...item,
        variable: item.classic,
        platform: [ETradingPlatform.mt5],
      })),
    }),
  {},
);

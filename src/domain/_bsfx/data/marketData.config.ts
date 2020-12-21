import { ETradingPlatform, MarketType } from '@domain/enums';
import {
  accountTypePip as _accountTypePip,
  assetsCharacteristics as _assetsCharacteristics,
  marketTableContent as _marketTableContent,
} from '@domain/defaultData/marketData.config';

export const assetsCharacteristics = {
  ..._assetsCharacteristics,
  [MarketType.forex]: {
    leverage: '1:500',
    spread: '1.4',
    margins: '0.20%',
  },
  [MarketType.indices]: {
    leverage: '1:100',
  },
  [MarketType.commodities]: {
    leverage: '1:67',
  },
};

export const accountTypePip = {
  ..._accountTypePip,
  variable: 1.4,
};

const tableEntries = Object.entries(_marketTableContent).map(([key, value]) => [
  key,
  value.map((item) => ({ ...item, raw: null, platform: [ETradingPlatform.mt5] })),
]);

export const marketTableContent = Object.fromEntries(tableEntries);

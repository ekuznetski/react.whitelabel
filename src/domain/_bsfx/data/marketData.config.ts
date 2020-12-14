import { ETradingPlatform, MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '@domain/defaultData/marketData.config';
import { marketTableContent as _marketTableContent } from '@domain/defaultData/marketData.config';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

const tableEntries = Object.entries(_marketTableContent).map(([key, value]) => [
  key,
  value.map((item) => ({ ...item, raw: null, platform: [ETradingPlatform.mt5] })),
]);

export const marketTableContent = Object.fromEntries(tableEntries);

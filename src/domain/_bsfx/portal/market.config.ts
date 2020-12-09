import { ETradingPlatform, MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '../../_default/portal/market.config';
import { marketTableContent as _marketTableContent } from '../../_default/portal/market.config';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

const tableEntries = Object.entries(_marketTableContent).map(([key, value]) => [
  key,
  value.map((item) => ({ ...item, raw: null, platform: [ETradingPlatform.mt5] })),
]);

export const marketTableContent = Object.fromEntries(tableEntries);

export const marketFiles = {
  financeFeesFixed: 'https://www.bluesquarefx.com/files/FINANCE_FEES_MT5_FIXED.pdf',
  financeFeesVariable: 'https://www.bluesquarefx.com/files/FINANCE_FEES_MT5_VARIABLE.pdf',
};

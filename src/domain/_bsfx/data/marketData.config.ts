import { MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '@domain/data/marketData.config';
export { marketTableContent } from '@domain/data/marketData.config';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

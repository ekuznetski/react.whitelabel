import { MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '@domain/defaultData/marketData.config';
export { marketTableContent } from '@domain/defaultData/marketData.config';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

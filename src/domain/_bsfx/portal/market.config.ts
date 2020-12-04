import { MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '@domain';
export { marketTableContent } from '@domain';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

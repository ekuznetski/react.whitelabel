import { MarketType } from '@domain/enums';
import { marketLeverages as _marketLeverages } from '../../_default/portal/market.config';
export { marketTableContent } from '../../_default/portal/market.config';

export const marketLeverages = {
  ..._marketLeverages,
  [MarketType.forex]: '1:500',
};

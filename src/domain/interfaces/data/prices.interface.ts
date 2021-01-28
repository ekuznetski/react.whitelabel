import { MarketType } from '@domain/enums';

export interface IPrices {
  [key: string]: IPricesItem;
}
export interface IPricesItem {
  points: string;
  details: {
    name: MarketType;
    bid: number;
    ask: null;
    variation: number;
  };
}

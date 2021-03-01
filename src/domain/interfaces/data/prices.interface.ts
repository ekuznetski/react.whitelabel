import { EAssetClass } from '@domain/enums';

export interface IPrices {
  [key: string]: IPricesItem;
}
export interface IPricesItem {
  points: string;
  details: {
    name: EAssetClass;
    bid: number;
    ask: null;
    variation: number;
  };
}

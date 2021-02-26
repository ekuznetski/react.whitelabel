import { EAssetClass } from '@domain/enums';
import { Dispatch, SetStateAction } from 'react';
export interface IPriceCarouselItem {
  name: string;
  bid: number;
  ask: number;
  variation: number;
  points: number[];
  active?: boolean;
  className?: string;
}

export interface IPriceTabInfo {
  title: string;
  desc: string;
  points: (string | React.ReactFragment)[];
  icon?: string;
  anchor?: EAssetClass;
}

export interface IPriceTabItem {
  name: string;
  icon: string;
  anchor: EAssetClass;
  info: IPriceTabInfo;
  priceData: IPriceCarouselItem[];
}

export interface IPriceTabMenu {
  items: IPriceTabItem[];
  activeTab: IPriceTabItem;
  selectTab: Dispatch<SetStateAction<IPriceTabItem | null | undefined>>;
}

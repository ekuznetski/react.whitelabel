import { MarketType } from '@domain/enums';
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
  title: string | React.ReactFragment;
  desc: string;
  points: (string | React.ReactFragment)[];
  icon?: string;
  anchor?: MarketType;
}

export interface IPriceTabItem {
  name: string;
  icon: string;
  anchor: MarketType;
  info: IPriceTabInfo;
  priceData: IPriceCarouselItem[];
}

export interface IPriceTabMenu {
  items: IPriceTabItem[];
  activeTab: IPriceTabItem;
  selectTab: Dispatch<SetStateAction<IPriceTabItem | null | undefined>>;
}

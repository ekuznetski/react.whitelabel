import { ITabs } from '@components/shared';
import { EWorkshopType } from '@domain/enums';
import { IClientBannerCard } from '..';

export interface IDashboardConfig {
  workshopsData: {
    type: EWorkshopType;
    author: {
      img: string;
      name: string;
      title: string;
    };
    schedule: {
      day: string;
      time: string;
    };
    info: {
      title: string;
      description: string;
    };
  }[];
  tabsData: ITabs;
  promotion_cards: IClientBannerCard[];
  bonus_cards: IClientBannerCard[];
  profileStatusTemplates: {
    [k in 'danger' | 'warning' | 'success']: {
      url: string | null;
      status: string;
      icon: string;
      text: string;
    };
  };
}

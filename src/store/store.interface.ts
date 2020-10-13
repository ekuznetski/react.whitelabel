import { EAppSection, ELanguage } from '@domain/enums';
import { AnyFunction, IContent, IGeoIp, ILogin, INotificationState } from '@domain/interfaces';
import {
  MClientData,
  MClientProfile,
  MClientTradingData,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import { EActionTypes } from './store.enum';

export interface IDataStore {
  content: IContent;
  geoIp: IGeoIp;
  client: {
    profile: MClientProfile;
    statusData: MClientData;
    preferences: ILogin;
    statements: MTransactionalStatementData;
  };
  tradingData: MClientTradingData;
  withdrawals: {
    history: MWithdrawalHistoryItem[];
    limit: number;
  };
}

export interface IAppStore {
  route: {
    path: string;
    locale: ELanguage;
    appSection: EAppSection;
    meta: {
      title: string;
      desc: string;
    };
    state: any;
  };
  requests: {
    activeList: EActionTypes[];
    failedList: EActionTypes[];
  };
  notification: INotificationState;
}

export interface IStore {
  data: IDataStore;
  app: IAppStore;
}

export interface IAction<T = { [k: string]: any }> {
  type: EActionTypes;
  payload?: T;
  force?: true | null;
  onSuccess?: AnyFunction;
  onFailure?: AnyFunction;
}

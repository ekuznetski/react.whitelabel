import { EAppSection, ELanguage } from '@domain/enums';
import { AnyFunction, IContent, IGeoIp, INotificationState } from '@domain/interfaces';
import * as Model from '@domain/models';
import { EActionTypes } from './store.enum';

export interface IDataStore {
  content: IContent;
  geoIp: IGeoIp;
  client: {
    profile: Model.MClientProfile;
    statusData: Model.MClientData;
    settings: Model.MClientSettings;
    statements: Model.MTransactionalStatementData;
    documents: Model.MDocument[];
    tins: Model.MTins;
  };
  tradingData: Model.MClientTradingData;
  withdrawals: {
    history: Model.MWithdrawalHistoryItem[];
    limit: number;
  };
  bankDetails: Model.MBankDetails;
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
    isLoading: boolean;
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
  type: EActionTypes | null;
  payload?: T;
  force?: true | null;
  onSuccess?: AnyFunction;
  onFailure?: AnyFunction;
}

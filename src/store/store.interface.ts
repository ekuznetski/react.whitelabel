import { EAppSection, ELanguage, EPagePath } from '@domain/enums';
import {
  AnyFunction,
  IContent,
  IDefaultClientSettings,
  IGeoIp,
  IModalState,
  INotificationState,
} from '@domain/interfaces';
import * as Model from '@domain/models';
import { EActionTypes } from './store.enum';

export interface IDataStore {
  content: IContent;
  geoIp: IGeoIp;
  client: {
    profile: Model.MClientProfile;
    status: Model.MClientStatus;
    settings: Model.MClientSettings | IDefaultClientSettings;
    statements: Model.MTransactionalStatementData;
    documents: Model.MDocuments;
    tins: Model.MTins;
    edd: Model.MEdd;
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
    path: EPagePath;
    locale: ELanguage;
    appSection: EAppSection;
    meta: {
      title: string;
      desc: string;
    };
    state: any;
    isLoading: boolean;
    redirectTo: EPagePath;
  };
  requests: {
    activeList: EActionTypes[];
    failedList: EActionTypes[];
  };
  notification: INotificationState;
  modal: IModalState;
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

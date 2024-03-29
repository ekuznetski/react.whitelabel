import { EAppSection, ELanguage, EPagePath } from '@domain/enums';
import { AnyFunction, IContent, IGeoIp, IModalState, INotificationState } from '@domain/interfaces';
import * as Model from '@domain/models';
import { EActionTypes } from './store.enum';
import { IPrices } from '../domain/interfaces/data/prices.interface';

export interface IDataStore {
  content: IContent;
  geoIp: IGeoIp;
  client: {
    profile: Model.MClientProfile;
    status: Model.MClientStatus;
    settings: Model.MClientSettings;
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
  prices: IPrices;
}

interface IAppStoreRoute {
  path: EPagePath;
  locale: ELanguage;
  appSection: EAppSection;
  meta: {
    title: string;
    desc?: string;
  };
  state: any;
  isLoading: boolean;
  redirectTo: EPagePath;
  prev?: IAppStoreRoute;
}

export interface IAppStore {
  route: IAppStoreRoute;
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

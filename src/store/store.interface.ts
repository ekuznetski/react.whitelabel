import { IClientProfile, IContent, IGeoIp, ILogin, INotificationState } from '@domain/interfaces';
import { MClientData, MClientTradingData, MTransactionalStatementData, MWithdrawalHistoryItem } from '@domain/models';
import { EActionTypes } from './store.enum';

export interface IDataStore {
  content: IContent;
  geoIp: IGeoIp;
  client: {
    profile: IClientProfile;
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
    current: string;
  };
  requests: {
    activeList: EActionTypes[];
    failedList: EActionTypes[];
  };
  notification: INotificationState;
  registration: {
    userExists: boolean;
    clientAdded: boolean;
  };
}

export interface IStore {
  data: IDataStore;
  app: IAppStore;
}

export interface IAction<T = { [k: string]: any }> {
  type: EActionTypes;
  payload?: T;
  success_cb?: (...args: any[]) => void;
  failure_cb?: (...args: any[]) => void;
}

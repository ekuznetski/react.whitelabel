import { IClientProfile, IContent, IGeoIp, ILogin, INotificationState } from '@domain/interfaces';
import { EActionTypes } from './store.enum';
import { MWithdrawalHistoryItem, MClientData, MClientTradingData } from '@domain/models';

export interface IDataStore {
	content: IContent;
	geoIp: IGeoIp;
	client: {
		profile: IClientProfile;
		data: MClientData;
		preferences: ILogin;
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

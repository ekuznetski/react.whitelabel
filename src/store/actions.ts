import { EAppSection, ELanguage } from '@domain/enums';
import {
  IClientAddRequest,
  IClientProfile,
  IContent,
  IGeoIp,
  IInternalTransferRequestData,
  ILoginRequest,
  INotificationState,
  ISetProfileRequest,
  ITransactionalStatementsRequestData,
} from '@domain/interfaces';
import { MClientData, MClientTradingData, MTransactionalStatementData, MWithdrawalHistoryItem } from '@domain/models';
import { EActionTypes } from './store.enum';
import { IAction } from './store.interface';
import { EAppSection } from '@domain/enums';

export function ac_showNotification(payload: Omit<INotificationState, 'visible'>): IAction {
  return {
    type: EActionTypes.showNotification,
    payload,
  };
}

export function ac_hideNotification(): IAction {
  return {
    type: EActionTypes.hideNotification,
  };
}

export function ac_fetchContent(payload: { page: string }): IAction {
  return {
    type: EActionTypes.fetchContent,
    payload,
  };
}

export function ac_fetchProfile() {
  return {
    type: EActionTypes.fetchProfile,
  };
}

export function ac_saveContent(payload: IContent): IAction {
  return {
    type: EActionTypes.saveContent,
    payload,
  };
}

export function ac_login(payload: ILoginRequest): IAction {
  return {
    type: EActionTypes.login,
    payload,
  };
}

export function ac_saveProfile(payload: IClientProfile): IAction {
  return {
    type: EActionTypes.saveProfile,
    payload,
  };
}

export function ac_userExists(payload: { username: string }, success_cb: Function, failure_cb?: Function): IAction {
  return {
    type: EActionTypes.userExists,
    payload,
    success_cb,
    failure_cb,
  };
}

export function ac_register(payload: { data: ISetProfileRequest }, success_cb: Function): IAction {
  return {
    type: EActionTypes.register,
    payload,
    success_cb,
  };
}

export function ac_saveUserExists(payload: { userExists: boolean }): IAction {
  return {
    type: EActionTypes.saveUserExists,
    payload,
  };
}

export function ac_preRegister(payload: { clientData: IClientAddRequest }, success_cb: Function): IAction {
  return {
    type: EActionTypes.preRegister,
    payload,
    success_cb,
  };
}

export function ac_saveClientAdd(payload: { clientAdded: boolean }): IAction {
  return {
    type: EActionTypes.saveClientAdd,
    payload,
  };
}

export function ac_forgotPassword(payload: { email: string }): IAction {
  return {
    type: EActionTypes.forgotPassword,
    payload,
  };
}

export function ac_resetPassword(payload: { email: string }): IAction {
  return {
    type: EActionTypes.resetPassword,
    payload,
  };
}

export function ac_fetchGeoIpData(): IAction {
  return {
    type: EActionTypes.fetchGeoIpData,
  };
}

export function ac_saveGeoIpData(payload: IGeoIp): IAction {
  return {
    type: EActionTypes.saveGeoIpData,
    payload,
  };
}

export function ac_updateRouteParams(payload: {
  path?: string;
  locale?: ELanguage | null;
  appSection?: EAppSection;
  meta?: {
    title: string;
    desc?: string;
  };
}): IAction {
  return {
    type: EActionTypes.updateRoute,
    payload,
  };
}

export function ac_requestActionSuccess(payload: { requestActionType?: EActionTypes }): IAction {
  return {
    type: EActionTypes.requestSuccess,
    payload,
  };
}

export function ac_requestActionFailure(payload: { requestActionType?: EActionTypes }): IAction {
  return {
    type: EActionTypes.requestFailure,
    payload,
  };
}

export function ac_fetchTradingAccounts(): IAction {
  return {
    type: EActionTypes.fetchTradingAccounts,
  };
}

export function ac_saveTradingAccounts(payload: MClientTradingData): IAction {
  return {
    type: EActionTypes.saveTradingAccounts,
    payload,
  };
}

export function ac_fetchWithdrawHistory(): IAction {
  return {
    type: EActionTypes.fetchWithdrawHistory,
  };
}

export function ac_saveWithdrawHistory(payload: MWithdrawalHistoryItem[]): IAction {
  return {
    type: EActionTypes.saveWithdrawHistory,
    payload,
  };
}

export function ac_fetchWithdrawLimit(payload: { accountId: number; platform: string }): IAction {
  return {
    type: EActionTypes.fetchWithdrawLimit,
    payload,
  };
}

export function ac_saveWithdrawLimit(payload: { limit: number }): IAction {
  return {
    type: EActionTypes.saveWithdrawLimit,
    payload,
  };
}

export function ac_fetchClientData(): IAction {
  return {
    type: EActionTypes.fetchClientData,
  };
}

export function ac_saveClientData(payload: MClientData): IAction {
  return {
    type: EActionTypes.saveClientData,
    payload,
  };
}

export function ac_makeInternalTransfer(
  payload: IInternalTransferRequestData,
  success_cb: Function,
  failure_cb?: Function,
): IAction {
  return {
    type: EActionTypes.makeInternalTransfer,
    payload,
    success_cb,
    failure_cb,
  };
}

export function ac_fetchTransactionalStatements(
  payload: ITransactionalStatementsRequestData,
  success_cb: Function,
  failure_cb?: Function,
): IAction {
  return {
    type: EActionTypes.fetchTransactionalStatements,
    payload,
    success_cb,
    failure_cb,
  };
}

export function ac_saveTransactionalStatements(payload: MTransactionalStatementData): IAction {
  return {
    type: EActionTypes.saveTransactionalStatements,
    payload,
  };
}

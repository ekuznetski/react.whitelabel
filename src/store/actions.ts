import { EAppSection, ELanguage } from '@domain/enums';
import {
  AnyFunction,
  IClientAddRequest,
  IContent,
  IEditProfileRequest,
  IGeoIp,
  IInternalTransferRequestData,
  ILoginRequest,
  INotificationState,
  IResetPasswordRequest,
  ISetProfileRequest,
  ITransactionalStatementsRequestData,
  IUserExistsRequest,
  IWithdrawFundRequest,
} from '@domain/interfaces';
import {
  MBankDetails,
  MClientData,
  MClientProfile,
  MClientTradingData,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import { EActionTypes } from './store.enum';
import { IAction } from './store.interface';

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

export function ac_login(payload: ILoginRequest, onFailure: AnyFunction = null): IAction {
  return {
    type: EActionTypes.login,
    payload,
    onFailure,
  };
}

export function ac_logout(): IAction {
  return {
    type: EActionTypes.logout,
  };
}

export function ac_editProfile(payload: IEditProfileRequest, onSuccess: AnyFunction, onFailure: AnyFunction): IAction {
  return {
    type: EActionTypes.editProfile,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_changePassword(
  payload: { old_password: string; new_password: string },
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.changePassword,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_saveProfile(payload: MClientProfile): IAction {
  return {
    type: EActionTypes.saveProfile,
    payload,
  };
}

export function ac_userExists(payload: IUserExistsRequest, onSuccess: AnyFunction, onFailure: AnyFunction): IAction {
  return {
    type: EActionTypes.userExists,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_register(
  payload: { data: ISetProfileRequest },
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.register,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_preRegister(payload: { clientData: IClientAddRequest }, onSuccess: AnyFunction): IAction {
  return {
    type: EActionTypes.preRegister,
    payload,
    onSuccess,
  };
}

export function ac_forgotPassword(payload: { email: string }, onSuccess: AnyFunction, onFailure: AnyFunction): IAction {
  return {
    type: EActionTypes.forgotPassword,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_resetPassword(
  payload: IResetPasswordRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.resetPassword,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchBankDetails(): IAction {
  return {
    type: EActionTypes.fetchBankDetails,
  };
}

export function ac_updateBankDetails(payload: MBankDetails, onSuccess: AnyFunction, onFailure: AnyFunction): IAction {
  return {
    type: EActionTypes.updateBankDetails,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_saveBankDetails(payload: MBankDetails): IAction {
  return {
    type: EActionTypes.saveBankDetails,
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

export function ac_clearStore(): IAction {
  return {
    type: EActionTypes.clearStore,
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
  state?: any;
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

export function ac_withdrawFunds(payload: IWithdrawFundRequest, onSuccess: AnyFunction): IAction {
  return {
    type: EActionTypes.withdrawFunds,
    payload,
    onSuccess,
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
  onSuccess: AnyFunction,
  onFailure?: AnyFunction,
): IAction {
  return {
    type: EActionTypes.makeInternalTransfer,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchTransactionalStatements(
  payload: ITransactionalStatementsRequestData,
  onSuccess: AnyFunction,
  onFailure?: AnyFunction,
): IAction {
  return {
    type: EActionTypes.fetchTransactionalStatements,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_saveTransactionalStatements(payload: MTransactionalStatementData): IAction {
  return {
    type: EActionTypes.saveTransactionalStatements,
    payload,
  };
}

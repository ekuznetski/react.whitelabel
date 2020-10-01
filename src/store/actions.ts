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

export const ac_showNotification = (payload: Omit<INotificationState, 'visible'>): IAction => ({
  type: EActionTypes.showNotification,
  payload,
});

export const ac_hideNotification = (): IAction => ({
  type: EActionTypes.hideNotification,
});

export const ac_fetchContent = (payload: { page: string }): IAction => ({
  type: EActionTypes.fetchContent,
  payload,
});

export const ac_fetchProfile = () => ({
  type: EActionTypes.fetchProfile,
});

export const ac_saveContent = (payload: IContent): IAction => ({
  type: EActionTypes.saveContent,
  payload,
});

export const ac_login = (payload: ILoginRequest): IAction => ({
  type: EActionTypes.login,
  payload,
});

export const ac_saveProfile = (payload: IClientProfile): IAction => ({
  type: EActionTypes.saveProfile,
  payload,
});

export const ac_userExists = (
  payload: { username: string },
  success_cb: () => void,
  failure_cb?: () => void,
): IAction => ({
  type: EActionTypes.userExists,
  payload,
  success_cb,
  failure_cb,
});

export const ac_register = (payload: { data: ISetProfileRequest }, success_cb: () => void): IAction => ({
  type: EActionTypes.register,
  payload,
  success_cb,
});

export const ac_saveUserExists = (payload: { userExists: boolean }): IAction => ({
  type: EActionTypes.saveUserExists,
  payload,
});

export const ac_preRegister = (payload: { clientData: IClientAddRequest }, success_cb: () => void): IAction => ({
  type: EActionTypes.preRegister,
  payload,
  success_cb,
});

export const ac_saveClientAdd = (payload: { clientAdded: boolean }): IAction => ({
  type: EActionTypes.saveClientAdd,
  payload,
});

export const ac_forgotPassword = (payload: { email: string }): IAction => ({
  type: EActionTypes.forgotPassword,
  payload,
});

export const ac_resetPassword = (payload: { email: string }): IAction => ({
  type: EActionTypes.resetPassword,
  payload,
});

export const ac_fetchGeoIpData = (): IAction => ({
  type: EActionTypes.fetchGeoIpData,
});

export const ac_saveGeoIpData = (payload: IGeoIp): IAction => ({
  type: EActionTypes.saveGeoIpData,
  payload,
});

export const ac_updateRouteParams = (payload: { current?: string }): IAction => ({
  type: EActionTypes.updateRoute,
  payload,
});

export const ac_requestActionSuccess = (payload: { requestActionType?: EActionTypes }): IAction => ({
  type: EActionTypes.requestSuccess,
  payload,
});

export const ac_requestActionFailure = (payload: { requestActionType?: EActionTypes }): IAction => ({
  type: EActionTypes.requestFailure,
  payload,
});

export const ac_fetchTradingAccounts = (): IAction => ({
  type: EActionTypes.fetchTradingAccounts,
});

export const ac_saveTradingAccounts = (payload: MClientTradingData): IAction => ({
  type: EActionTypes.saveTradingAccounts,
  payload,
});

export const ac_fetchWithdrawHistory = (): IAction => ({
  type: EActionTypes.fetchWithdrawHistory,
});

export const ac_saveWithdrawHistory = (payload: MWithdrawalHistoryItem[]): IAction => ({
  type: EActionTypes.saveWithdrawHistory,
  payload,
});

export const ac_fetchWithdrawLimit = (payload: { accountId: number; platform: string }): IAction => ({
  type: EActionTypes.fetchWithdrawLimit,
  payload,
});

export const ac_saveWithdrawLimit = (payload: { limit: number }): IAction => ({
  type: EActionTypes.saveWithdrawLimit,
  payload,
});

export const ac_fetchClientData = (): IAction => ({
  type: EActionTypes.fetchClientData,
});

export const ac_saveClientData = (payload: MClientData): IAction => ({
  type: EActionTypes.saveClientData,
  payload,
});

export const ac_makeInternalTransfer = (
  payload: IInternalTransferRequestData,
  success_cb: () => void,
  failure_cb?: () => void,
): IAction => ({
  type: EActionTypes.makeInternalTransfer,
  payload,
  success_cb,
  failure_cb,
});

export const ac_fetchTransactionalStatements = (
  payload: ITransactionalStatementsRequestData,
  success_cb: () => void,
  failure_cb?: () => void,
): IAction => ({
  type: EActionTypes.fetchTransactionalStatements,
  payload,
  success_cb,
  failure_cb,
});

export const ac_saveTransactionalStatements = (payload: MTransactionalStatementData): IAction => ({
  type: EActionTypes.saveTransactionalStatements,
  payload,
});

import { EAppSection, EDocumentsType, ELanguage } from '@domain/enums';
import {
  AnyFunction,
  IClientAddRequest,
  IContent,
  ICreateTradingAccountRequest,
  IEditProfileRequest,
  IGeoIp,
  IInternalTransferRequestData,
  ILoginRequest,
  INotificationState,
  IResetPasswordRequest,
  ISetProfileRequest,
  ISubmitFPRequest,
  ITransactionalStatementsRequestData,
  IUserExistsRequest,
  IWithdrawFundRequest,
  IPartnershipRegistrationRequest,
  IPartnershipIBRegistrationRequest,
} from '@domain/interfaces';
import {
  MBankDetails,
  MClientData,
  MClientProfile,
  MClientTradingData,
  MDocument,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import { EActionTypes } from './store.enum';
import { IAction } from './store.interface';
import { IClientSettingsRequest } from '@domain/interfaces';
import { MClientSettings } from '../domain/models/clientSettings';

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

export function ac_fetchClientSettings(
  payload: IClientSettingsRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction = null,
): IAction {
  return {
    type: EActionTypes.fetchClientSettings,
    payload,
    onSuccess,
    onFailure,
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

export function ac_saveClientSettings(payload: MClientSettings): IAction {
  return {
    type: EActionTypes.saveClientSettings,
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

export function ac_preRegister(
  payload: { clientData: IClientAddRequest },
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.preRegister,
    payload,
    onSuccess,
    onFailure,
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
  isLoading?: boolean;
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

export function ac_submitFinancialProfile(payload: ISubmitFPRequest): IAction {
  return {
    type: EActionTypes.submitFinancialProfile,
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

export function ac_createTradingAccount(
  payload: ICreateTradingAccountRequest,
  demo: boolean,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: demo ? EActionTypes.createDemoTradingAccount : EActionTypes.createLiveTradingAccount,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchWithdrawLimit(payload: { accountId: string; platform: string }): IAction {
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

export function ac_addDeposit<T>(
  payload: T,
  onSuccess: AnyFunction = () => {},
  onFailure: AnyFunction = () => {},
): IAction {
  return {
    type: EActionTypes.addDeposit,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchDocuments(payload?: { force: true | null }): IAction {
  return {
    type: EActionTypes.fetchDocuments,
    force: payload?.force || null,
  };
}

export function ac_saveDocuments(payload: MDocument[]): IAction {
  return {
    type: EActionTypes.saveDocuments,
    payload,
  };
}

export function ac_uploadDocuments(
  payload: { [K in typeof EDocumentsType[keyof typeof EDocumentsType]]?: Blob },
  onSuccess: AnyFunction = () => {},
  onFailure: AnyFunction = () => {},
): IAction {
  return {
    type: EActionTypes.fetchDocuments,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_partnershipRegisterStandard(
  payload: IPartnershipRegistrationRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction = null,
): IAction {
  return {
    type: EActionTypes.partnershipRegister,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_partnershipRegisterIB(
  payload: IPartnershipIBRegistrationRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction = null,
): IAction {
  return {
    type: EActionTypes.partnershipRegisterIB,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchStocksPrices(onSuccess: AnyFunction = null, onFailure: AnyFunction = null): IAction {
  return {
    type: EActionTypes.fetchStocksPrices,
    onSuccess,
    onFailure,
  };
}

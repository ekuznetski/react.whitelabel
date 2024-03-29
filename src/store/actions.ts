import { EAppSection, EDocumentsType, ELanguage, EPagePath } from '@domain/enums';
import {
  AnyFunction,
  ExtractComponentProps,
  IChangeAccountLeverageRequest,
  IChangeAccountPasswordRequest,
  IChangeAccountSettingsRequest,
  IClientAddRequest,
  IClientSettingsRequest,
  IContent,
  ICreateTradingAccountRequest,
  IEdd,
  IEditProfileRequest,
  IGeoIp,
  IInternalTransferRequestData,
  ILoginRequest,
  IModalState,
  INotificationState,
  IPartnershipIBRegistrationRequest,
  IPartnershipRegistrationRequest,
  IResetPasswordRequest,
  ISendReferrerLinkRequest,
  ISetProfileRequest,
  ISubmitFPRequest,
  ITins,
  ITransactionalStatementsRequestData,
  IUserExistsRequest,
  IWithdrawFundRequest,
} from '@domain/interfaces';
import {
  MBankDetails,
  MClientProfile,
  MClientSettings,
  MClientStatus,
  MClientTradingData,
  MDocuments,
  MEdd,
  MTins,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import { EActionTypes } from './store.enum';
import { IAction, IAppStore } from './store.interface';

export function ac_showModal<T = {}>(
  component: T,
  props?: ExtractComponentProps<T> | {},
  modalWrapperClassName?: string,
): IAction {
  return {
    type: EActionTypes.showModal,
    payload: { component, props, modalWrapperClassName },
  };
}

export function ac_hideModal(): IAction {
  return {
    type: EActionTypes.hideModal,
  };
}

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

export function ac_fetchProfile(payload?: { force: true | null }): IAction {
  return {
    type: EActionTypes.fetchProfile,
    force: payload?.force || null,
  };
}

export function ac_fetchClientSettings(
  payload: IClientSettingsRequest,
  onSuccess: AnyFunction = null,
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

export function ac_login(
  payload: ILoginRequest,
  onSuccess: AnyFunction = null,
  onFailure: AnyFunction = null,
): IAction {
  return {
    type: EActionTypes.login,
    payload,
    onSuccess,
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
  payload: { clientStatus: IClientAddRequest },
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

export function ac_updateRouteParams(payload: Partial<IAppStore['route']>): IAction {
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

export function ac_submitFinancialProfile(
  payload: ISubmitFPRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.submitFinancialProfile,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_fetchTradingAccounts(payload?: { force: true | null }): IAction {
  return {
    type: EActionTypes.fetchTradingAccounts,
    force: payload?.force || null,
  };
}

export function ac_saveTradingAccounts(payload: MClientTradingData): IAction {
  return {
    type: EActionTypes.saveTradingAccounts,
    payload,
  };
}

export function ac_fetchPrices(): IAction {
  return {
    type: EActionTypes.fetchPrices,
  };
}

export function ac_savePrices(payload: any): IAction {
  return {
    type: EActionTypes.savePrices,
    payload,
  };
}

export function ac_fetchWithdrawHistory(): IAction {
  return {
    type: EActionTypes.fetchWithdrawHistory,
  };
}

export function ac_cancelWithdrawal(payload: { id: string }, onSuccess: AnyFunction, onFailure: AnyFunction): IAction {
  return {
    type: EActionTypes.cancelWithdraw,
    payload,
    onSuccess,
    onFailure,
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

export function ac_fetchWithdrawLimit(payload: Omit<IWithdrawFundRequest, 'amount'>): IAction {
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

export function ac_fetchClientData(payload?: { force: true | null }): IAction {
  return {
    type: EActionTypes.fetchClientData,
    force: payload?.force || null,
  };
}

export function ac_saveClientData(payload: MClientStatus): IAction {
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

export function ac_clearTransactionalStatements(): IAction {
  return {
    type: EActionTypes.clearTransactionalStatements,
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

export function ac_saveDocuments(payload: MDocuments): IAction {
  return {
    type: EActionTypes.saveDocuments,
    payload,
  };
}

export function ac_uploadDocuments(
  payload: { [K in typeof EDocumentsType[keyof typeof EDocumentsType]]?: Blob },
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.uploadDocuments,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_updateTins(
  payload: ITins,
  onSuccess: AnyFunction = () => {},
  onFailure: AnyFunction = () => {},
): IAction {
  return {
    type: EActionTypes.updateTins,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_saveTins(payload: MTins): IAction {
  return {
    type: EActionTypes.saveTins,
    payload,
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

export function ac_sendReferrerLink(
  payload: ISendReferrerLinkRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction = null,
): IAction {
  return {
    type: EActionTypes.sendReferrerLink,
    payload,
    onSuccess,
    onFailure,
  };
}
export function ac_saveEdd(payload: MEdd): IAction {
  return {
    type: EActionTypes.saveEdd,
    payload,
  };
}

export function ac_submitEdd(payload: IEdd, onSuccess: AnyFunction = null, onFailure: AnyFunction = null): IAction {
  return {
    type: EActionTypes.submitEdd,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_changeAccountSettings(
  payload: IChangeAccountSettingsRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.changeAccountSettings,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_changeAccountPassword(
  payload: IChangeAccountPasswordRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.changeAccountPassword,
    payload,
    onSuccess,
    onFailure,
  };
}

export function ac_changeAccountLeverage(
  payload: IChangeAccountLeverageRequest,
  onSuccess: AnyFunction,
  onFailure: AnyFunction,
): IAction {
  return {
    type: EActionTypes.changeAccountLeverage,
    payload,
    onSuccess,
    onFailure,
  };
}

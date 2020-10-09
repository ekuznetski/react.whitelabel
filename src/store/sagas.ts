import {
  IBaseResponse,
  IClientAddResponse,
  IClientProfileResponse,
  IClientStatusDataResponse,
  ILoginResponse,
  ISetProfileResponse,
  ITradingAccountsResponse,
  ITransactionalStatementsResponse,
  IWithdrawalHistoryResponse,
  IWithdrawalLimitResponse,
} from '@domain/interfaces';
import { MClientData, MClientTradingData, MTransactionalStatementData, MWithdrawalHistoryItem } from '@domain/models';
import { store } from './';
import {
  clientAddRequest,
  clientSetProfileRequest,
  forgotPasswordRequest,
  getClientDataRequest,
  getContentRequest,
  getGeoIpRequest,
  getProfileRequest,
  getTransactionalStatementsRequest,
  internalTransferRequest,
  loginRequest,
  logoutRequest,
  resetPasswordRequest,
  tradingAccountsRequest,
  userExistsRequest,
  withdrawalsHistoryRequest,
  withdrawalsLimitRequest,
} from '@utils/services';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ac_clearStore,
  ac_fetchTradingAccounts,
  ac_requestActionFailure,
  ac_requestActionSuccess,
  ac_saveClientData,
  ac_saveContent,
  ac_saveGeoIpData,
  ac_saveProfile,
  ac_saveTradingAccounts,
  ac_saveTransactionalStatements,
  ac_saveWithdrawHistory,
  ac_saveWithdrawLimit,
} from './actions';
import { EActionTypes } from './store.enum';
import { IAction } from './store.interface';

function __store() {
  return store.getState();
}

function $$(fn: any, actionType: EActionTypes, storeValue: any = null) {
  return function* (action?: IAction) {
    const { payload, force, onSuccess, onFailure } = action || {};

    if (force || !storeValue) {
      try {
        let response = yield fn(action);
        console.log(response);
        if (onSuccess) yield call(onSuccess, response);
        yield put(ac_requestActionSuccess({ requestActionType: actionType }));
      } catch (e) {
        if (onFailure) yield call(onFailure, e);
        yield put(ac_requestActionFailure({ requestActionType: actionType }));
      }
    } else {
      yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchProfile }));
    }
  };
}

function* mw_getContent({ payload }: IAction) {
  const response = yield call(getContentRequest, payload?.page);
  yield put(ac_saveContent({ [payload?.page]: response.data }));
  return response;
}

function* mw_getProfile() {
  const { response }: IClientProfileResponse = yield call(getProfileRequest);
  yield put(ac_saveProfile(response.message));
  return response;
}

function* mw_login({ payload }: IAction) {
  const { response }: ILoginResponse = yield call(loginRequest, payload);
  yield put(ac_saveProfile(response.profile));
  return response;
}

function* mw_logout() {
  const { response }: any = yield call(logoutRequest);
  yield put(ac_clearStore());
  console.log('store cleared');
  return response;
}

function* mw_userExist({ payload }: IAction) {
  const { response }: IBaseResponse = yield call(userExistsRequest, payload);
  return response;
}

function* mw_clientAdd({ payload }: IAction) {
  const { response }: IClientAddResponse = yield call(clientAddRequest, payload);
  return response;
}

function* mw_forgotPassword({ payload }: IAction) {
  const { response } = yield call(forgotPasswordRequest, payload);
  return response;
}

function* mw_resetPassword({ payload }: IAction) {
  const { response } = yield call(resetPasswordRequest, payload);
  return response;
}

function* mw_setProfile({ payload, onSuccess, onFailure }: IAction) {
  const { response }: ISetProfileResponse = yield call(clientSetProfileRequest, payload);
  yield put(ac_saveProfile(response.profile));
  return response;
}

function* mw_getGeoIP() {
  const response = yield call(getGeoIpRequest);
  yield put(ac_saveGeoIpData(response));
  return response;
}

function* mw_getTradingAccounts() {
  const { response }: ITradingAccountsResponse = yield call(tradingAccountsRequest);
  yield put(ac_saveTradingAccounts(new MClientTradingData(response)));
  return response;
}

function* mw_getWithdrawHistory() {
  const { response }: IWithdrawalHistoryResponse = yield call(withdrawalsHistoryRequest);
  const payload = response.message.map((item) => new MWithdrawalHistoryItem(item));
  yield put(ac_saveWithdrawHistory(payload));
  return response;
}

function* mw_getWithdrawLimit({ payload }: IAction<{ accountId: number; platform: string }>) {
  try {
    const { response }: IWithdrawalLimitResponse = yield call(withdrawalsLimitRequest, {
      trade_account: payload?.accountId,
      trade_platform: payload?.platform,
    });
    yield put(ac_saveWithdrawLimit({ limit: response.data }));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchWithdrawLimit }));
  } catch (e) {
    // if can't load the actual limit send the account balance
    const limit =
      __store().data?.tradingData?.accounts.find((account) => account.accountId === payload?.accountId)?.balance ||
      1000000000000;
    yield put(ac_saveWithdrawLimit({ limit }));
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchWithdrawLimit }));
  }
}

function* mw_getClientStatusData() {
  const { response }: IClientStatusDataResponse = yield call(getClientDataRequest);
  const payload = new MClientData(response);
  yield put(ac_saveClientData(payload));
  return response;
}

function* mw_makeInternalTransfer({ payload, onSuccess, onFailure }: IAction) {
  const { response }: any = yield call(internalTransferRequest, payload);
  yield put(ac_fetchTradingAccounts());
  return response;
}

function* mw_fetchTransactionalStatements({ payload, onSuccess, onFailure }: IAction) {
  const { response }: ITransactionalStatementsResponse = yield call(getTransactionalStatementsRequest, payload);
  const data = new MTransactionalStatementData(response);
  yield put(ac_saveTransactionalStatements(data));
  return response;
}

export function* getContentSaga() {
  yield takeEvery(EActionTypes.fetchContent, $$(mw_getContent, EActionTypes.fetchContent));
}

export function* getGeoIPSaga() {
  yield takeEvery(EActionTypes.fetchGeoIpData, $$(mw_getGeoIP, EActionTypes.fetchGeoIpData));
}

export function* getProfileSaga() {
  yield takeEvery(
    EActionTypes.fetchProfile,
    $$(mw_getProfile, EActionTypes.fetchProfile, __store().data.client.profile),
  );
}

export function* loginSaga() {
  yield takeEvery(EActionTypes.login, $$(mw_login, EActionTypes.login));
}

export function* logoutSaga() {
  yield takeEvery(EActionTypes.logout, $$(mw_logout, EActionTypes.logout));
}

export function* clientAddSaga() {
  yield takeEvery(EActionTypes.preRegister, $$(mw_clientAdd, EActionTypes.preRegister));
}

export function* userExistSaga() {
  yield takeEvery(EActionTypes.userExists, $$(mw_userExist, EActionTypes.userExists));
}

export function* forgotPasswordSaga() {
  yield takeEvery(EActionTypes.forgotPassword, $$(mw_forgotPassword, EActionTypes.forgotPassword));
}

export function* resetPasswordSaga() {
  yield takeEvery(EActionTypes.resetPassword, $$(mw_resetPassword, EActionTypes.resetPassword));
}

export function* setProfileSaga() {
  yield takeEvery(EActionTypes.register, $$(mw_setProfile, EActionTypes.register));
}

export function* getWithdrawHistorySaga() {
  yield takeEvery(EActionTypes.fetchWithdrawHistory, $$(mw_getWithdrawHistory, EActionTypes.fetchWithdrawHistory));
}

export function* getWithdrawLimitSaga() {
  yield takeEvery(EActionTypes.fetchWithdrawLimit, mw_getWithdrawLimit);
}

export function* getClientStatusDataSaga() {
  yield takeEvery(EActionTypes.fetchClientData, $$(mw_getClientStatusData, EActionTypes.fetchClientData));
}

export function* getTradingAccountsSage() {
  yield takeEvery(EActionTypes.fetchTradingAccounts, $$(mw_getTradingAccounts, EActionTypes.fetchTradingAccounts));
}

export function* makeInternalTransferSage() {
  yield takeEvery(EActionTypes.makeInternalTransfer, $$(mw_makeInternalTransfer, EActionTypes.makeInternalTransfer));
}

export function* fetchTransactionalStatementsSage() {
  yield takeEvery(
    EActionTypes.fetchTransactionalStatements,
    $$(mw_fetchTransactionalStatements, EActionTypes.fetchTransactionalStatements),
  );
}

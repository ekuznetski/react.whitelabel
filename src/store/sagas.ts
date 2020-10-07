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
import { ac_clearStore, store } from '@store';
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

function* getContentMiddleware({ payload }: IAction) {
  try {
    const response = yield call(getContentRequest, payload?.page);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchContent }));
    yield put(ac_saveContent({ [payload?.page]: response.data }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchContent }));
  }
}

function* getProfileMiddleware() {
  try {
    const { response }: IClientProfileResponse = yield call(getProfileRequest);
    yield put(ac_saveProfile(response.message));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchProfile }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchProfile }));
  }
}

function* loginMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response }: ILoginResponse = yield call(loginRequest, payload);
    yield put(ac_saveProfile(response.profile));
    if (onSuccess) yield call(onSuccess, response);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.login }));
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.login }));
  }
}

function* logoutMiddleware() {
  try {
    const { response }: any = yield call(logoutRequest);
    yield put(ac_clearStore());
    console.log('store cleared');
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.logout }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.logout }));
  }
}

function* userExistMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response }: IBaseResponse = yield call(userExistsRequest, payload);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.userExists }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.userExists }));
  }
}

function* clientAddMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response }: IClientAddResponse = yield call(clientAddRequest, payload);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.preRegister }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.preRegister }));
  }
}

function* forgotPasswordMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response } = yield call(forgotPasswordRequest, payload);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.forgotPassword }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.forgotPassword }));
  }
}

function* resetPasswordMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response } = yield call(resetPasswordRequest, payload);
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.resetPassword }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.resetPassword }));
  }
}

function* setProfileMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response }: ISetProfileResponse = yield call(clientSetProfileRequest, payload);
    yield put(ac_saveProfile(response.profile));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.register }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.register }));
  }
}

function* getGeoIPMiddleware() {
  try {
    const response = yield call(getGeoIpRequest);
    yield put(ac_saveGeoIpData(response));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchGeoIpData }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchGeoIpData }));
  }
}

function* getTradingAccountsMiddleware() {
  try {
    const { response }: ITradingAccountsResponse = yield call(tradingAccountsRequest);
    yield put(ac_saveTradingAccounts(new MClientTradingData(response)));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchTradingAccounts }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchTradingAccounts }));
  }
}

function* getWithdrawHistoryMiddleware() {
  try {
    const { response }: IWithdrawalHistoryResponse = yield call(withdrawalsHistoryRequest);
    const payload = response.message.map((item) => new MWithdrawalHistoryItem(item));
    yield put(ac_saveWithdrawHistory(payload));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchWithdrawHistory }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchWithdrawHistory }));
  }
}

function* getWithdrawLimitMiddleware({ payload }: IAction<{ accountId: number; platform: string }>) {
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
      store.getState().data?.tradingData?.accounts.find((account) => account.accountId === payload?.accountId)
        ?.balance || 1000000000000;
    yield put(ac_saveWithdrawLimit({ limit }));
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchWithdrawLimit }));
  }
}

function* getClientStatusDataMiddleware() {
  try {
    const { response }: IClientStatusDataResponse = yield call(getClientDataRequest);
    const payload = new MClientData(response);
    yield put(ac_saveClientData(payload));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchClientData }));
  } catch (e) {
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchClientData }));
  }
}

function* makeInternalTransferMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    yield call(internalTransferRequest, payload);
    yield put(ac_fetchTradingAccounts());
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.makeInternalTransfer }));
    if (onSuccess) yield call(onSuccess);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.makeInternalTransfer }));
  }
}

function* fetchTransactionalStatementsMiddleware({ payload, onSuccess, onFailure }: IAction) {
  try {
    const { response }: ITransactionalStatementsResponse = yield call(getTransactionalStatementsRequest, payload);
    const data = new MTransactionalStatementData(response);
    yield put(ac_saveTransactionalStatements(data));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchTransactionalStatements }));
    if (onSuccess) yield call(onSuccess);
  } catch (e) {
    if (onFailure) yield call(onFailure, e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchTransactionalStatements }));
  }
}

export function* getContentSaga() {
  yield takeEvery(EActionTypes.fetchContent, getContentMiddleware);
}

export function* getGeoIPSaga() {
  yield takeEvery(EActionTypes.fetchGeoIpData, getGeoIPMiddleware);
}

export function* getProfileSaga() {
  yield takeEvery(EActionTypes.fetchProfile, getProfileMiddleware);
}

export function* loginSaga() {
  yield takeEvery(EActionTypes.login, loginMiddleware);
}

export function* logoutSaga() {
  yield takeEvery(EActionTypes.logout, logoutMiddleware);
}

export function* clientAddSaga() {
  yield takeEvery(EActionTypes.preRegister, clientAddMiddleware);
}

export function* userExistSaga() {
  yield takeEvery(EActionTypes.userExists, userExistMiddleware);
}

export function* forgotPasswordSaga() {
  yield takeEvery(EActionTypes.forgotPassword, forgotPasswordMiddleware);
}

export function* resetPasswordSaga() {
  yield takeEvery(EActionTypes.resetPassword, resetPasswordMiddleware);
}

export function* setProfileSaga() {
  yield takeEvery(EActionTypes.register, setProfileMiddleware);
}

export function* getWithdrawHistorySaga() {
  yield takeEvery(EActionTypes.fetchWithdrawHistory, getWithdrawHistoryMiddleware);
}

export function* getWithdrawLimitSaga() {
  yield takeEvery(EActionTypes.fetchWithdrawLimit, getWithdrawLimitMiddleware);
}

export function* getClientStatusDataSaga() {
  yield takeEvery(EActionTypes.fetchClientData, getClientStatusDataMiddleware);
}

export function* getTradingAccountsSage() {
  yield takeEvery(EActionTypes.fetchTradingAccounts, getTradingAccountsMiddleware);
}

export function* makeInternalTransferSage() {
  yield takeEvery(EActionTypes.makeInternalTransfer, makeInternalTransferMiddleware);
}

export function* fetchTransactionalStatementsSage() {
  yield takeEvery(EActionTypes.fetchTransactionalStatements, fetchTransactionalStatementsMiddleware);
}

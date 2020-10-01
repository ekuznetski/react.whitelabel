import { EResponseStatus } from '@domain/enums';
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
import { store } from '@store';
import {
  clientAddRequest,
  clientSetProfileRequest,
  getClientDataRequest,
  getContentRequest,
  getGeoIpRequest,
  getProfileRequest,
  getTransactionalStatementsRequest,
  internalTransferRequest,
  loginRequest,
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
  ac_saveClientAdd,
  ac_saveClientData,
  ac_saveContent,
  ac_saveGeoIpData,
  ac_saveProfile,
  ac_saveTradingAccounts,
  ac_saveTransactionalStatements,
  ac_saveUserExists,
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
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchContent }));
    // TODO error handler
  }
}

function* getProfileMiddleware() {
  try {
    const { response }: IClientProfileResponse = yield call(getProfileRequest);
    yield put(ac_saveProfile(response.message));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchProfile }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchProfile }));
    // TODO error handler
  }
}

function* loginMiddleware({ payload }: IAction) {
  try {
    const { response }: ILoginResponse = yield call(loginRequest, payload);
    yield put(ac_saveProfile(response.profile));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.login }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.login }));
    // TODO error handler
  }
}

function* userExistMiddleware({ payload, success_cb: onSuccess, failure_cb: onFailure }: IAction) {
  try {
    const { response }: IBaseResponse = yield call(userExistsRequest, payload);
    console.log(response);
    yield put(ac_saveUserExists({ userExists: response?.status === EResponseStatus.success }));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.userExists }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    // console.log(e);
    if (onFailure) yield call(onFailure);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.userExists }));
    // TODO error handler
  }
}

function* clientAddMiddleware({ payload, success_cb: onSuccess, failure_cb: onFailure }: IAction) {
  try {
    console.log(payload);
    const { response }: IClientAddResponse = yield call(clientAddRequest, payload);
    yield put(ac_saveClientAdd({ clientAdded: response?.status === EResponseStatus.success })); //todo remove
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.preRegister }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    // console.log(e);
    if (onFailure) yield call(onFailure);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.preRegister }));
    // TODO error handler
  }
}

function* setProfileMiddleware({ payload, success_cb: onSuccess, failure_cb: onFailure }: IAction) {
  try {
    console.log(payload);
    const { response }: ISetProfileResponse = yield call(clientSetProfileRequest, payload);
    yield put(ac_saveProfile(response.profile));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.preRegister }));
    if (onSuccess) yield call(onSuccess, response);
  } catch (e) {
    // console.log(e);
    if (onFailure) yield call(onFailure);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.preRegister }));
    // TODO error handler
  }
}

function* getGeoIPMiddleware() {
  try {
    const response = yield call(getGeoIpRequest);
    yield put(ac_saveGeoIpData(response));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchGeoIpData }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchGeoIpData }));
    // TODO error handler
  }
}

function* getTradingAccountsMiddleware() {
  try {
    const { response }: ITradingAccountsResponse = yield call(tradingAccountsRequest);
    yield put(ac_saveTradingAccounts(new MClientTradingData(response)));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchTradingAccounts }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchTradingAccounts }));
    // TODO error handler
  }
}

function* getWithdrawHistoryMiddleware() {
  try {
    const { response }: IWithdrawalHistoryResponse = yield call(withdrawalsHistoryRequest);
    const payload = response.message.map((item) => new MWithdrawalHistoryItem(item));
    yield put(ac_saveWithdrawHistory(payload));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchWithdrawHistory }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchWithdrawHistory }));
    // TODO error handler
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
    // TODO error handler
  }
}

function* getClientStatusDataMiddleware() {
  try {
    const { response }: IClientStatusDataResponse = yield call(getClientDataRequest);
    const payload = new MClientData(response);
    yield put(ac_saveClientData(payload));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchClientData }));
  } catch (e) {
    // console.log(e);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchClientData }));
    // TODO error handler
  }
}

function* makeInternalTransferMiddleware({ payload, success_cb, failure_cb }: IAction) {
  try {
    yield call(internalTransferRequest, payload);
    yield put(ac_fetchTradingAccounts());
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.makeInternalTransfer }));
    if (success_cb) yield call(success_cb);
  } catch (e) {
    // console.log(e);
    if (failure_cb) yield call(failure_cb);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.makeInternalTransfer }));
    // TODO error handler
  }
}

function* fetchTransactionalStatementsMiddleware({ payload, success_cb, failure_cb }: IAction) {
  try {
    const { response }: ITransactionalStatementsResponse = yield call(getTransactionalStatementsRequest, payload);
    const data = new MTransactionalStatementData(response);
    yield put(ac_saveTransactionalStatements(data));
    yield put(ac_requestActionSuccess({ requestActionType: EActionTypes.fetchTransactionalStatements }));
    if (success_cb) yield call(success_cb);
  } catch (e) {
    // console.log(e);
    if (failure_cb) yield call(failure_cb);
    yield put(ac_requestActionFailure({ requestActionType: EActionTypes.fetchTransactionalStatements }));
    // TODO error handler
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

export function* existSaga() {
  yield takeEvery(EActionTypes.userExists, userExistMiddleware);
}

export function* clientAddSaga() {
  yield takeEvery(EActionTypes.preRegister, clientAddMiddleware);
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

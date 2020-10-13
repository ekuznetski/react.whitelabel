import {
  IBaseResponse,
  IClientAddResponse,
  IClientProfileResponse,
  IClientStatusDataResponse,
  IEditProfileResponse,
  ILoginResponse,
  ISetProfileResponse,
  ITradingAccountsResponse,
  ITransactionalStatementsResponse,
  IWithdrawalHistoryResponse,
  IWithdrawalLimitResponse,
} from '@domain/interfaces';
import {
  MClientData,
  MClientProfile,
  MClientTradingData,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import {
  clientAddRequest,
  clientSetProfileRequest,
  editProfileRequest,
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
import { store } from './';
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

/**
 * Get slice of the Store at the current moment.
 * @param path - Describes the path to the data in store
 *
 * Possible values: `a.b.c` or `a.0.c`
 */
function pathToStoreSnapshot(path: string) {
  if (path) {
    let _store = store.getState();
    if (typeof path === 'string') {
      if (path.replace(/([\w|-]+\.?)+/g, '').length > 0) {
        return new TypeError('Path not math the pattern ([w|-]+.?)+: ' + path);
      }
      const _path = path.split('.');
      while (_store != null && _path.length > 0) {
        // @ts-ignore
        _store = _store[_path.shift()];
      }
      return path.length > 0 && !_path.length ? _store : store.getState();
    } else {
      throw new TypeError(`Unexpected type '${typeof path}' in select operator, expected 'string' or 'function'`);
    }
  }
  return null;
}

function* $$(
  actionType: EActionTypes,
  success_transform_response_fn: any,
  pathToStore?: string | null,
  failure_transform_response_fn?: any,
) {
  yield takeEvery(actionType, function* (action?: IAction) {
    const { payload, force, onSuccess, onFailure } = action || {};

    if (force || !(pathToStore && pathToStoreSnapshot(pathToStore))) {
      try {
        let response = yield success_transform_response_fn(action);
        if (onSuccess) yield call(onSuccess, response);
        yield put(ac_requestActionSuccess({ requestActionType: actionType }));
      } catch (e) {
        if (failure_transform_response_fn) yield failure_transform_response_fn(action);
        else if (onFailure) yield call(onFailure, e);
        yield put(ac_requestActionFailure({ requestActionType: actionType }));
      }
    } else {
      // console.log('Data Exist: ' + actionType);
      yield put(ac_requestActionSuccess({ requestActionType: actionType }));
    }
  });
}

export function* getContentSaga() {
  yield $$(EActionTypes.fetchContent, function* ({ payload }: IAction) {
    const response = yield call(getContentRequest, payload?.page);
    yield put(ac_saveContent({ [payload?.page]: response.data }));
    return response;
  });
}

export function* getGeoIPSaga() {
  yield $$(
    EActionTypes.fetchGeoIpData,
    function* () {
      const response = yield call(getGeoIpRequest);
      yield put(ac_saveGeoIpData(response));
      return response;
    },
    'data.geoIp',
  );
}

export function* getProfileSaga() {
  yield $$(
    EActionTypes.fetchProfile,
    function* () {
      const { response }: IClientProfileResponse = yield call(getProfileRequest);
      yield put(ac_saveProfile(new MClientProfile(response.message)));
      return response;
    },
    'data.client.profile',
  );
}

export function* editProfileSaga() {
  yield $$(EActionTypes.editProfile, function* () {
    const { response }: IEditProfileResponse = yield call(editProfileRequest);
    yield put(ac_saveProfile(new MClientProfile(response.data)));
    return response;
  });
}

export function* loginSaga() {
  yield $$(EActionTypes.login, function* ({ payload }: IAction) {
    const { response }: ILoginResponse = yield call(loginRequest, payload);
    yield put(ac_saveProfile(new MClientProfile(response.profile)));
    return response;
  });
}

export function* logoutSaga() {
  yield $$(EActionTypes.logout, function* () {
    const { response }: any = yield call(logoutRequest);
    yield put(ac_clearStore());
    console.log('store cleared');
    return response;
  });
}

export function* clientAddSaga() {
  yield $$(EActionTypes.preRegister, function* ({ payload }: IAction) {
    const { response }: IClientAddResponse = yield call(clientAddRequest, payload);
    return response;
  });
}

export function* userExistSaga() {
  yield $$(EActionTypes.userExists, function* ({ payload }: IAction) {
    const { response }: IBaseResponse = yield call(userExistsRequest, payload);
    return response;
  });
}

export function* forgotPasswordSaga() {
  yield $$(EActionTypes.forgotPassword, function* ({ payload }: IAction) {
    const { response } = yield call(forgotPasswordRequest, payload);
    return response;
  });
}

export function* resetPasswordSaga() {
  yield $$(EActionTypes.resetPassword, function* ({ payload }: IAction) {
    const { response } = yield call(resetPasswordRequest, payload);
    return response;
  });
}

export function* setProfileSaga() {
  yield $$(EActionTypes.register, function* ({ payload }: IAction) {
    const { response }: ISetProfileResponse = yield call(clientSetProfileRequest, payload);
    yield put(ac_saveProfile(new MClientProfile(response.profile)));
    return response;
  });
}

export function* getWithdrawHistorySaga() {
  yield $$(EActionTypes.fetchWithdrawHistory, function* () {
    const { response }: IWithdrawalHistoryResponse = yield call(withdrawalsHistoryRequest);
    const payload = response.message.map((item) => new MWithdrawalHistoryItem(item));
    yield put(ac_saveWithdrawHistory(payload));
    return response;
  });
}

export function* getWithdrawLimitSaga() {
  yield $$(
    EActionTypes.fetchWithdrawLimit,
    function* ({ payload }: IAction) {
      const { response }: IWithdrawalLimitResponse = yield call(withdrawalsLimitRequest, {
        trade_account: payload?.accountId,
        trade_platform: payload?.platform,
      });
      yield put(ac_saveWithdrawLimit({ limit: response.data }));
      return response;
    },
    null,
    function* ({ payload }: IAction) {
      const limit =
        store.getState().data?.tradingData?.accounts.find((account) => account.accountId === payload?.accountId)
          ?.balance || 1000000000000;
      yield put(ac_saveWithdrawLimit({ limit }));
      return limit;
    },
  );
}

export function* getClientStatusDataSaga() {
  yield $$(
    EActionTypes.fetchClientData,
    function* () {
      const { response }: IClientStatusDataResponse = yield call(getClientDataRequest);
      const payload = new MClientData(response);
      yield put(ac_saveClientData(payload));
      return response;
    },
    'data.client.statusData',
  );
}

export function* getTradingAccountsSage() {
  yield $$(
    EActionTypes.fetchTradingAccounts,
    function* () {
      const { response }: ITradingAccountsResponse = yield call(tradingAccountsRequest);
      yield put(ac_saveTradingAccounts(new MClientTradingData(response)));
      return response;
    },
    'data.tradingData',
  );
}

export function* makeInternalTransferSage() {
  yield $$(EActionTypes.makeInternalTransfer, function* ({ payload }: IAction) {
    const { response }: any = yield call(internalTransferRequest, payload);
    yield put(ac_fetchTradingAccounts());
    return response;
  });
}

export function* fetchTransactionalStatementsSage() {
  yield $$(EActionTypes.fetchTransactionalStatements, function* ({ payload }: IAction) {
    const { response }: ITransactionalStatementsResponse = yield call(getTransactionalStatementsRequest, payload);
    const data = new MTransactionalStatementData(response);
    yield put(ac_saveTransactionalStatements(data));
    return response;
  });
}

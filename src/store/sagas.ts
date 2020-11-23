import { ETradingPlatform } from '@domain/enums';
import {
  IAddDepositResponse,
  IBankDetailsResponse,
  IBaseResponse,
  IClientAddResponse,
  IClientProfileResponse,
  IClientStatusDataResponse,
  ICreateTradingAccountRequest,
  IDocumentsInterfaceResponse,
  IEditProfileResponse,
  ILoginResponse,
  ISetProfileResponse,
  ITradingAccountsResponse,
  ITransactionalStatementsResponse,
  IWithdrawalHistoryResponse,
  IWithdrawalLimitResponse,
  IWithdrawFundRequest,
} from '@domain/interfaces';
import {
  MClientData,
  MClientProfile,
  MClientTradingData,
  MDocument,
  MTransactionalStatementData,
  MWithdrawalHistoryItem,
} from '@domain/models';
import {
  addDepositRequest,
  clientAddRequest,
  clientSetProfileRequest,
  createMT4DemoAccountRequest,
  createMT4LiveAccountRequest,
  createMT5DemoAccountRequest,
  createMT5LiveAccountRequest,
  editProfileRequest,
  forgotPasswordRequest,
  getBankDetailsRequest,
  getClientDataRequest,
  getContentRequest,
  getDocumentsRequest,
  getGeoIpRequest,
  getProfileRequest,
  getTransactionalStatementsRequest,
  internalTransferRequest,
  loginRequest,
  logoutRequest,
  mt4WithdrawFundsRequest,
  mt5WithdrawFundsRequest,
  resetPasswordRequest,
  financialProfileRequest,
  tradingAccountsRequest,
  updateBankDetailsRequest,
  uploadFileRequest,
  userExistsRequest,
  withdrawalsHistoryRequest,
  withdrawalsLimitRequest,
} from '@utils/services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { store } from './';
import {
  ac_clearStore,
  ac_fetchDocuments,
  ac_fetchTradingAccounts,
  ac_fetchWithdrawHistory,
  ac_requestActionFailure,
  ac_requestActionSuccess,
  ac_saveBankDetails,
  ac_saveClientData,
  ac_saveContent,
  ac_saveDocuments,
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
        if (failure_transform_response_fn) e = yield failure_transform_response_fn(action, e);
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
  yield $$(EActionTypes.editProfile, function* ({ payload }: IAction) {
    const { response }: IEditProfileResponse = yield call(editProfileRequest, payload);
    yield put(ac_saveProfile(new MClientProfile(response.data)));
    return response;
  });
}

export function* changeProfilePasswordSaga() {
  yield $$(EActionTypes.changePassword, function* ({ payload }: IAction) {
    const { response }: any = yield call(editProfileRequest, payload);
    yield put(ac_saveProfile(new MClientProfile(response.data)));
    return response;
  });
}

export function* getBankDetailsSaga() {
  yield $$(EActionTypes.fetchBankDetails, function* () {
    const { response }: IBankDetailsResponse = yield call(getBankDetailsRequest);
    yield put(ac_saveBankDetails(response.message));
    return response;
  });
}

export function* updateBankDetailsSaga() {
  yield $$(EActionTypes.updateBankDetails, function* ({ payload }: IAction) {
    const { response }: IBankDetailsResponse = yield call(updateBankDetailsRequest, payload);
    yield put(ac_saveBankDetails(response.data));
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
    return response;
  });
}

export function* withdrawFundsSaga() {
  yield $$(EActionTypes.withdrawFunds, function* ({ payload }: IAction<IWithdrawFundRequest>) {
    yield call(
      payload?.trade_platform === ETradingPlatform.mt4 ? mt4WithdrawFundsRequest : mt5WithdrawFundsRequest,
      payload,
    );
    yield put(ac_fetchWithdrawHistory());
    return;
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

export function* financialProfileSage() {
  yield $$(EActionTypes.submitFinancialProfile, function* ({ payload }: IAction) {
    const { response }: any = yield call(financialProfileRequest, payload);
    return response;
  });
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

export function* createLiveTradingAccountsSage() {
  yield $$(EActionTypes.createLiveTradingAccount, function* ({ payload }: IAction<ICreateTradingAccountRequest>) {
    const { response } = yield call(
      payload?.platform === ETradingPlatform.mt4 ? createMT4LiveAccountRequest : createMT5LiveAccountRequest,
      {
        account_type: payload?.account_type,
        currency: payload?.currency,
        leverage: payload?.leverage,
      },
    );
    yield put(ac_fetchTradingAccounts());
    return response.data;
  });
}

export function* createDemoTradingAccountsSage() {
  yield $$(EActionTypes.createDemoTradingAccount, function* ({ payload }: IAction<ICreateTradingAccountRequest>) {
    const { response } = yield call(
      payload?.platform === ETradingPlatform.mt4 ? createMT4DemoAccountRequest : createMT5DemoAccountRequest,
      {
        account_type: payload?.account_type,
        currency: payload?.currency,
        leverage: payload?.leverage,
      },
    );
    yield put(ac_fetchTradingAccounts());
    return response.data;
  });
}

export function* makeInternalTransferSage() {
  yield $$(EActionTypes.makeInternalTransfer, function* ({ payload }: IAction) {
    const { response }: any = yield call(internalTransferRequest, payload);
    yield put(ac_fetchTradingAccounts());
    return response;
  });
}

export function* fetchDocumentsSage() {
  yield $$(
    EActionTypes.fetchDocuments,
    function* () {
      const { response }: IDocumentsInterfaceResponse = yield call(getDocumentsRequest);
      const data = response.message.map((document) => new MDocument(document));
      yield put(ac_saveDocuments(data));
      return response;
    },
    'data.client.documents',
  );
}

export function* uploadFileSage() {
  yield $$(EActionTypes.uploadDocuments, function* ({ payload }: IAction) {
    const { response }: any = yield call(uploadFileRequest, payload);
    yield put(ac_fetchDocuments({ force: true }));
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

export function* addDepositSage() {
  yield $$(EActionTypes.addDeposit, function* ({ payload }: IAction) {
    const response: IAddDepositResponse = yield call(addDepositRequest, payload);
    return response;
  });
}

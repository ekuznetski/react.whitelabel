import { EResponseStatus, ETradingPlatform } from '@domain/enums';
import {
  IAddDepositResponse,
  IBankDetailsResponse,
  IBaseResponse,
  IChangeAccountLeverageResponse,
  IChangeAccountPasswordResponse,
  IChangeAccountSettingsResponse,
  IClientAddResponse,
  IClientProfileResponse,
  IClientSettingsResponse,
  IClientStatusDataResponse,
  ICreateTradingAccountRequest,
  IDocumentsInterfaceResponse,
  IEddResponse,
  IEditProfileResponse,
  ILoginResponse,
  IPartnershipIBRegistrationResponse,
  IPartnershipRegistrationResponse,
  ISetProfileResponse,
  ITinsResponse,
  ITradingAccountsResponse,
  ITransactionalStatementsResponse,
  IWithdrawFundRequest,
  IWithdrawalHistoryResponse,
  IWithdrawalLimitResponse,
} from '@domain/interfaces';
import * as Model from '@domain/models';
import { MRequestAdapter } from '@domain/models';
import * as Request from '@utils/services';
import { call, put, takeEvery } from 'redux-saga/effects';
import { store } from './';
import * as Action from './actions';
import { EActionTypes } from './store.enum';
import { IAction } from './store.interface';

const failureResponseConsoleBlacklist = [81];

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
    if (!!action && !!payload) {
      action.payload = new MRequestAdapter(actionType, payload);
    }
    if (force || !(pathToStore && pathToStoreSnapshot(pathToStore))) {
      try {
        let response = yield success_transform_response_fn(action);
        if (onSuccess) {
          yield call(onSuccess, response);
        }
        yield put(Action.ac_requestActionSuccess({ requestActionType: actionType }));
      } catch (e) {
        if (e && !failureResponseConsoleBlacklist.some((err) => e?.data?.response.messageCode == err)) {
          console.error(e);
        }
        if (failure_transform_response_fn) {
          e = yield failure_transform_response_fn(action, e);
        } else if (onFailure) {
          yield call(onFailure, e);
        }
        yield put(Action.ac_requestActionFailure({ requestActionType: actionType }));
      }
    } else {
      // console.log('Data Exist: ' + actionType);
      yield put(Action.ac_requestActionSuccess({ requestActionType: actionType }));
    }
  });
}

export function* getContentSaga() {
  yield $$(EActionTypes.fetchContent, function* ({ payload }: IAction) {
    const response = yield call(Request.getContentRequest, payload?.page);
    yield put(Action.ac_saveContent({ [payload?.page]: response.data }));
    return response;
  });
}

export function* getGeoIPSaga() {
  yield $$(
    EActionTypes.fetchGeoIpData,
    function* () {
      const response = yield call(Request.getGeoIpRequest);
      yield put(Action.ac_saveGeoIpData(response));
      yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response)));
      return response;
    },
    'data.geoIp',
  );
}

export function* getProfileSaga() {
  yield $$(
    EActionTypes.fetchProfile,
    function* () {
      const { response }: IClientProfileResponse = yield call(Request.getProfileRequest);
      yield put(Action.ac_saveProfile(new Model.MClientProfile(response.message)));
      yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
      return response;
    },
    'data.client.profile',
  );
}

export function* getClientSettingsSaga() {
  yield $$(EActionTypes.fetchClientSettings, function* ({ payload }: IAction) {
    const { response }: IClientSettingsResponse = yield call(Request.getClientSettingsRequest, payload);
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
    return response;
  });
}

export function* editProfileSaga() {
  yield $$(EActionTypes.editProfile, function* ({ payload }: IAction) {
    const { response }: IEditProfileResponse = yield call(Request.editProfileRequest, payload);
    yield put(Action.ac_saveProfile(new Model.MClientProfile(response.data)));
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.data)));
    return response;
  });
}

export function* changeProfilePasswordSaga() {
  yield $$(EActionTypes.changePassword, function* ({ payload }: IAction) {
    const { response }: any = yield call(Request.editProfileRequest, payload);
    yield put(Action.ac_saveProfile(new Model.MClientProfile(response.data)));
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.data)));
    return response;
  });
}

export function* getBankDetailsSaga() {
  yield $$(EActionTypes.fetchBankDetails, function* () {
    const { response }: IBankDetailsResponse = yield call(Request.getBankDetailsRequest);
    yield put(Action.ac_saveBankDetails(response.message));
    return response;
  });
}

export function* updateBankDetailsSaga() {
  yield $$(EActionTypes.updateBankDetails, function* ({ payload }: IAction) {
    const { response }: IBankDetailsResponse = yield call(Request.updateBankDetailsRequest, payload);
    yield put(Action.ac_saveBankDetails(response.data));
    return response;
  });
}

export function* loginSaga() {
  yield $$(EActionTypes.login, function* ({ payload }: IAction) {
    const { response }: ILoginResponse = yield call(Request.loginRequest, payload);
    yield put(Action.ac_saveProfile(new Model.MClientProfile(response.profile)));
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.profile)));
    return response;
  });
}

export function* logoutSaga() {
  yield $$(EActionTypes.logout, function* () {
    const { response }: any = yield call(Request.logoutRequest);
    yield put(Action.ac_clearStore());
    return response;
  });
}

export function* clientAddSaga() {
  yield $$(EActionTypes.preRegister, function* ({ payload }: IAction) {
    const { response }: IClientAddResponse = yield call(Request.clientAddRequest, payload);
    yield put(Action.ac_fetchClientSettings({ username: payload?.email }));
    return response;
  });
}

export function* userExistSaga() {
  yield $$(EActionTypes.userExists, function* ({ payload }: IAction) {
    const { response }: IBaseResponse = yield call(Request.userExistsRequest, payload);
    return response;
  });
}

export function* forgotPasswordSaga() {
  yield $$(EActionTypes.forgotPassword, function* ({ payload }: IAction) {
    const { response } = yield call(Request.forgotPasswordRequest, payload);
    return response;
  });
}

export function* resetPasswordSaga() {
  yield $$(EActionTypes.resetPassword, function* ({ payload }: IAction) {
    const { response } = yield call(Request.resetPasswordRequest, payload);
    return response;
  });
}

export function* setProfileSaga() {
  yield $$(EActionTypes.register, function* ({ payload }: IAction) {
    const { response }: ISetProfileResponse = yield call(Request.clientSetProfileRequest, payload);
    return response;
  });
}

export function* withdrawFundsSaga() {
  yield $$(EActionTypes.withdrawFunds, function* ({ payload }: IAction<IWithdrawFundRequest>) {
    yield call(
      payload?.trade_platform === ETradingPlatform.mt4
        ? Request.mt4WithdrawFundsRequest
        : Request.mt5WithdrawFundsRequest,
      payload,
    );
    yield put(Action.ac_fetchWithdrawHistory());
    return;
  });
}

export function* getWithdrawHistorySaga() {
  yield $$(EActionTypes.fetchWithdrawHistory, function* () {
    const { response }: IWithdrawalHistoryResponse = yield call(Request.withdrawalsHistoryRequest);
    const payload = response.message.map((item) => new Model.MWithdrawalHistoryItem(item));
    yield put(Action.ac_saveWithdrawHistory(payload));
    return response;
  });
}

export function* getWithdrawLimitSaga() {
  yield $$(
    EActionTypes.fetchWithdrawLimit,
    function* ({ payload }: IAction) {
      const { response }: IWithdrawalLimitResponse = yield call(Request.withdrawalsLimitRequest, {
        trade_account: payload?.accountId,
        trade_platform: payload?.platform,
      });
      yield put(Action.ac_saveWithdrawLimit({ limit: response.data }));
      return response;
    },
    null,
    function* ({ payload }: IAction) {
      const limit =
        store.getState().data?.tradingData?.accounts.find((account) => account.accountId === payload?.accountId)
          ?.balance || 1000000000000;
      yield put(Action.ac_saveWithdrawLimit({ limit }));
      return limit;
    },
  );
}

export function* getClientStatusDataSaga() {
  yield $$(
    EActionTypes.fetchClientData,
    function* () {
      const { response }: IClientStatusDataResponse = yield call(Request.getClientDataRequest);
      yield put(Action.ac_saveClientData(new Model.MClientStatus(response)));
      yield put(Action.ac_saveTins(new Model.MTins(response.tins_data))); // remove when API clients/tins will been added
      yield put(Action.ac_saveEdd(new Model.MEdd(response.edd_data))); // remove when API clients/edd will been added
      return response;
    },
    'data.client.status',
  );
}

export function* updateTinsSaga() {
  yield $$(EActionTypes.updateTins, function* ({ payload }: IAction) {
    console.log('TODO save tins after response');
    const { response }: ITinsResponse = yield call(Request.updateTinsRequest, payload);
    // yield put(Action.ac_saveTins(new Model.MTins(response.message))); // TODO uncomment when API clients/tins will been added
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* submitEddSaga() {
  yield $$(EActionTypes.submitEdd, function* ({ payload }: IAction) {
    const { response }: IEddResponse = yield call(Request.submitEddRequest, payload);
    // yield put(Action.ac_saveEdd(new Model.MEdd(response.message))); // uncomment when API clients/tins will been added
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* financialProfileSaga() {
  yield $$(EActionTypes.submitFinancialProfile, function* ({ payload }: IAction) {
    const { response }: any = yield call(Request.financialProfileRequest, payload);
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* getTradingAccountsSaga() {
  yield $$(
    EActionTypes.fetchTradingAccounts,
    function* () {
      const { response }: ITradingAccountsResponse = yield call(Request.tradingAccountsRequest);
      yield put(Action.ac_saveTradingAccounts(new Model.MClientTradingData(response)));
      return response;
    },
    'data.tradingData',
  );
}

export function* createLiveTradingAccountsSaga() {
  yield $$(EActionTypes.createLiveTradingAccount, function* ({ payload }: IAction<ICreateTradingAccountRequest>) {
    const { response } = yield call(
      payload?.platform === ETradingPlatform.mt4
        ? Request.createMT4LiveAccountRequest
        : Request.createMT5LiveAccountRequest,
      {
        account_type: payload?.account_type,
        currency: payload?.currency,
        leverage: payload?.leverage,
      },
    );
    yield put(Action.ac_fetchTradingAccounts());
    return response.data;
  });
}

export function* createDemoTradingAccountsSaga() {
  yield $$(EActionTypes.createDemoTradingAccount, function* ({ payload }: IAction<ICreateTradingAccountRequest>) {
    const { response } = yield call(
      payload?.platform === ETradingPlatform.mt4
        ? Request.createMT4DemoAccountRequest
        : Request.createMT5DemoAccountRequest,
      {
        account_type: payload?.account_type,
        currency: payload?.currency,
        leverage: payload?.leverage,
      },
    );
    yield put(Action.ac_fetchTradingAccounts());
    return response.data;
  });
}

export function* makeInternalTransferSaga() {
  yield $$(EActionTypes.makeInternalTransfer, function* ({ payload }: IAction) {
    const { response }: any = yield call(Request.internalTransferRequest, payload);
    yield put(Action.ac_fetchTradingAccounts());
    return response;
  });
}

export function* fetchDocumentsSaga() {
  yield $$(
    EActionTypes.fetchDocuments,
    function* () {
      const { response }: IDocumentsInterfaceResponse = yield call(Request.getDocumentsRequest);
      yield put(Action.ac_saveDocuments(new Model.MDocuments(response.message)));
      return response;
    },
    'data.client.documents',
  );
}

export function* uploadFileSaga() {
  yield $$(EActionTypes.uploadDocuments, function* ({ payload }: IAction) {
    const { response }: any = yield call(Request.uploadFileRequest, payload);
    yield put(Action.ac_fetchDocuments({ force: true }));
    return response;
  });
}

export function* fetchTransactionalStatementsSaga() {
  yield $$(EActionTypes.fetchTransactionalStatements, function* ({ payload }: IAction) {
    const { response }: ITransactionalStatementsResponse = yield call(
      Request.getTransactionalStatementsRequest,
      payload,
    );
    const data = new Model.MTransactionalStatementData(response);
    yield put(Action.ac_saveTransactionalStatements(data));
    return response;
  });
}

export function* addDepositSaga() {
  yield $$(EActionTypes.addDeposit, function* ({ payload }: IAction) {
    const response: IAddDepositResponse = yield call(Request.addDepositRequest, payload);
    return response;
  });
}

export function* fetchStocksPricesSaga() {
  yield $$(EActionTypes.fetchStocksPrices, function* () {
    return yield call(Request.getStocksPricesRequest);
  });
}

export function* partnershipRegistrationSaga() {
  yield $$(EActionTypes.partnershipRegister, function* ({ payload }: IAction) {
    const { response }: IPartnershipRegistrationResponse = yield call(Request.partnershipRegistrationRequest, payload);
    return response;
  });
}

export function* changeAccountLeverageSaga() {
  yield $$(EActionTypes.changeAccountLeverage, function* ({ payload }: IAction) {
    const { response }: IChangeAccountLeverageResponse = yield call(Request.changeAccountLeverageRequest, payload);
    console.log(response);
    if (response.status === EResponseStatus.success) {
      const { response }: ITradingAccountsResponse = yield call(Request.tradingAccountsRequest);
      yield put(Action.ac_saveTradingAccounts(new Model.MClientTradingData(response)));
    }
    return response;
  });
}

export function* changeAccountSettingsSaga() {
  yield $$(EActionTypes.changeAccountSettings, function* ({ payload }: IAction) {
    const { response }: IChangeAccountSettingsResponse = yield call(Request.changeAccountSettingsRequest, payload);
    console.log(response);
    if (response.status === EResponseStatus.success) {
      const { response }: ITradingAccountsResponse = yield call(Request.tradingAccountsRequest);
      yield put(Action.ac_saveTradingAccounts(new Model.MClientTradingData(response)));
    }
    return response;
  });
}

export function* changeAccountPasswordSaga() {
  yield $$(EActionTypes.changeAccountPassword, function* ({ payload }: IAction) {
    const { response }: IChangeAccountPasswordResponse = yield call(Request.changeAccountPasswordRequest, payload);
    console.log(response);
    return response;
  });
}

export function* registerIBSaga() {
  yield $$(EActionTypes.partnershipRegisterIB, function* ({ payload }: IAction) {
    const { response }: IPartnershipIBRegistrationResponse = yield call(
      Request.partnershipIBRegistrationRequest,
      payload,
    );
    return response;
  });
}

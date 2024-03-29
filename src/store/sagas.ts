import { EAssetClass, ENotificationType, EResponseStatus, ETradingPlatform } from '@domain/enums';
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
  IEddResponse,
  IEditProfileResponse,
  ILoginResponse,
  IPartnershipIBRegistrationResponse,
  IPartnershipRegistrationResponse,
  ISendReferrerLinkResponse,
  ISetProfileResponse,
  ITinsResponse,
  ITradingAccountsResponse,
  ITransactionalStatementsResponse,
  IWithdrawFundRequest,
  IWithdrawalCancelResponse,
  IWithdrawalHistoryResponse,
  IWithdrawalLimitResponse,
} from '@domain/interfaces';
import * as Model from '@domain/models';
import { MRequestAdapter } from '@domain/models';
import { Request } from '@utils/services';
import { call, cancel, delay, put, takeEvery } from 'redux-saga/effects';
import { ac_showNotification, store } from './';
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
  yield takeEvery(actionType, function* (action?: IAction): any {
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
        if (e && e.status !== 200 && e.status !== 403) {
          console.log(e, actionType);
          yield put(
            ac_showNotification({
              type: ENotificationType.danger,
              message: 'Server error, please contact administrator...',
            }),
          );
        } else if (e && !failureResponseConsoleBlacklist.some((err) => e?.data?.response?.messageCode == err)) {
          if (!window.isSSR) console.info('!failureResponseConsoleBlacklist --- ', e);
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

// export function* getContentSaga() {
//   yield $$(EActionTypes.fetchContent, function* ({ payload }: IAction) {
//     const response = yield call(Requests[actionType](), payload?.page);
//     yield put(Action.ac_saveContent({ [payload?.page]: response.data }));
//     return response;
//   });
// }

export function* getGeoIPSaga() {
  yield $$(
    EActionTypes.fetchGeoIpData,
    function* (): any {
      const response = yield call(Request[EActionTypes.fetchGeoIpData]());
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
      const { response }: IClientProfileResponse = yield call(Request[EActionTypes.fetchProfile]());
      yield put(Action.ac_saveProfile(new Model.MClientProfile(response.message)));
      yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
      return response.message;
    },
    'data.client.profile',
  );
}

export function* getClientSettingsSaga() {
  yield $$(EActionTypes.fetchClientSettings, function* ({ payload }: IAction) {
    const { response }: IClientSettingsResponse = yield call(Request[EActionTypes.fetchClientSettings](), payload);
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.message)));
    return response.message;
  });
}

export function* editProfileSaga() {
  yield $$(EActionTypes.editProfile, function* ({ payload }: IAction) {
    const { response }: IEditProfileResponse = yield call(Request[EActionTypes.editProfile](), payload);
    yield put(Action.ac_saveProfile(new Model.MClientProfile(response.data)));
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.data)));
    return response.data;
  });
}

export function* changeClientProfilePasswordSaga() {
  yield $$(EActionTypes.changePassword, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.changePassword](), payload);
    return response;
  });
}

export function* getBankDetailsSaga() {
  yield $$(
    EActionTypes.fetchBankDetails,
    function* () {
      const { response }: IBankDetailsResponse = yield call(Request[EActionTypes.fetchBankDetails]());
      yield put(Action.ac_saveBankDetails(new Model.MBankDetails(response.message)));
      return response.message;
    },
    'data.bankDetails',
  );
}

export function* updateBankDetailsSaga() {
  yield $$(EActionTypes.updateBankDetails, function* ({ payload }: IAction) {
    const { response }: IBankDetailsResponse = yield call(Request[EActionTypes.updateBankDetails](), payload);
    yield put(Action.ac_saveBankDetails(new Model.MBankDetails(response.data)));
    return response.data;
  });
}

export function* loginSaga() {
  yield $$(EActionTypes.login, function* ({ payload }: IAction) {
    const { response }: ILoginResponse = yield call(Request[EActionTypes.login](), payload);
    yield put(Action.ac_saveProfile(new Model.MClientProfile(response.profile)));
    yield put(Action.ac_saveClientSettings(new Model.MClientSettings(response.profile)));
    return response;
  });
}

export function* logoutSaga() {
  yield $$(EActionTypes.logout, function* () {
    const { response } = yield call(Request[EActionTypes.logout]());
    yield put(Action.ac_clearStore());
    return response;
  });
}

export function* clientAddSaga() {
  yield $$(EActionTypes.preRegister, function* ({ payload }: IAction) {
    const { response }: IClientAddResponse = yield call(Request[EActionTypes.preRegister](), payload);
    yield put(Action.ac_fetchClientSettings({ username: payload?.email }));
    return response;
  });
}

export function* userExistSaga() {
  yield $$(EActionTypes.userExists, function* ({ payload }: IAction) {
    const { response }: IBaseResponse = yield call(Request[EActionTypes.userExists](), payload);
    return response;
  });
}

export function* forgotPasswordSaga() {
  yield $$(EActionTypes.forgotPassword, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.forgotPassword](), payload);
    return response;
  });
}

export function* resetPasswordSaga() {
  yield $$(EActionTypes.resetPassword, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.resetPassword](), payload);
    return response;
  });
}

export function* setProfileSaga() {
  yield $$(EActionTypes.register, function* ({ payload }: IAction) {
    const { response }: ISetProfileResponse = yield call(Request[EActionTypes.register](), payload);
    return response;
  });
}

export function* withdrawFundsSaga() {
  yield $$(EActionTypes.withdrawFunds, function* ({ payload }: IAction<IWithdrawFundRequest>) {
    yield call(
      payload?.trade_platform === ETradingPlatform.mt4
        ? Request[EActionTypes.withdrawMt4Funds]()
        : Request[EActionTypes.withdrawMt5Funds](),
      payload,
    );
    yield put(Action.ac_fetchWithdrawHistory());
    return;
  });
}

export function* getWithdrawHistorySaga() {
  yield $$(EActionTypes.fetchWithdrawHistory, function* () {
    const { response }: IWithdrawalHistoryResponse = yield call(Request[EActionTypes.fetchWithdrawHistory]());
    const payload = response.message.map((item) => new Model.MWithdrawalHistoryItem(item));
    yield put(Action.ac_saveWithdrawHistory(payload));
    return response.message;
  });
}

export function* cancelWithdrawHistorySaga() {
  yield $$(EActionTypes.cancelWithdraw, function* ({ payload }: IAction) {
    const { response }: IWithdrawalCancelResponse = yield call(Request[EActionTypes.cancelWithdraw](), payload);
    yield put(Action.ac_fetchWithdrawHistory());
    // yield put(Action.ac_fetchTradingAccounts({ force: true }));
    return response;
  });
}

export function* getWithdrawLimitSaga() {
  yield $$(
    EActionTypes.fetchWithdrawLimit,
    function* ({ payload }: IAction) {
      const { response }: IWithdrawalLimitResponse = yield call(Request[EActionTypes.fetchWithdrawLimit](), payload);
      yield put(Action.ac_saveWithdrawLimit({ limit: response.data }));
      return response.data;
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
      const { response }: IClientStatusDataResponse = yield call(Request[EActionTypes.fetchClientData]());
      yield put(Action.ac_saveClientData(new Model.MClientStatus(response)));
      yield put(Action.ac_saveDocuments(new Model.MDocuments(response.document_status)));
      yield put(Action.ac_saveTins(new Model.MTins(response.tins_data)));
      yield put(Action.ac_saveEdd(new Model.MEdd(response.edd_data)));
      return response;
    },
    'data.client.status',
  );
}

export function* updateTinsSaga() {
  yield $$(EActionTypes.updateTins, function* ({ payload }: IAction) {
    const { response }: ITinsResponse = yield call(Request[EActionTypes.updateTins](), payload);
    yield put(Action.ac_saveTins(new Model.MTins(response.message)));
    yield put(Action.ac_fetchClientData({ force: true }));
    return response.message;
  });
}

export function* submitEddSaga() {
  yield $$(EActionTypes.submitEdd, function* ({ payload }: IAction) {
    const { response }: IEddResponse = yield call(Request[EActionTypes.submitEdd](), payload);
    // yield put(Action.ac_saveEdd(new Model.MEdd(response.message))); // uncomment when API clients/tins will been added
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* financialProfileSaga() {
  yield $$(EActionTypes.submitFinancialProfile, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.submitFinancialProfile](), payload);
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* fetchPricesSaga() {
  yield $$(EActionTypes.fetchPrices, function* ({ payload }: IAction): any {
    const response = yield call(Request[EActionTypes.fetchPrices](), payload);
    yield put(
      Action.ac_savePrices(
        Object.keys(response).reduce((acc, e) => {
          Object.assign(acc, { [e.toLowerCase() as keyof typeof EAssetClass]: response[e] });
          return acc;
        }, {}),
      ),
    );
    return response;
  });
}

export function* getTradingAccountsSaga() {
  yield $$(
    EActionTypes.fetchTradingAccounts,
    function* () {
      const { response }: ITradingAccountsResponse = yield call(Request[EActionTypes.fetchTradingAccounts]());
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
        ? Request[EActionTypes.createMt4LiveTradingAccount]()
        : Request[EActionTypes.createMt5LiveTradingAccount](),
      payload,
    );
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    yield put(Action.ac_fetchProfile({ force: true }));
    return response.data;
  });
}

export function* createDemoTradingAccountsSaga() {
  yield $$(EActionTypes.createDemoTradingAccount, function* ({ payload }: IAction<ICreateTradingAccountRequest>) {
    const { response } = yield call(
      payload?.platform === ETradingPlatform.mt4
        ? Request[EActionTypes.createMt4DemoTradingAccount]()
        : Request[EActionTypes.createMt5DemoTradingAccount](),
      payload,
    );
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    yield put(Action.ac_fetchProfile({ force: true }));
    return response.data;
  });
}

export function* makeInternalTransferSaga() {
  yield $$(EActionTypes.makeInternalTransfer, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.makeInternalTransfer](), payload);
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    return response;
  });
}

export function* uploadFileSaga() {
  yield $$(EActionTypes.uploadDocuments, function* ({ payload }: IAction) {
    const { response } = yield call(Request[EActionTypes.uploadDocuments](), payload);
    yield put(Action.ac_fetchClientData({ force: true }));
    return response;
  });
}

export function* fetchTransactionalStatementsSaga() {
  yield $$(EActionTypes.fetchTransactionalStatements, function* ({ payload }: IAction) {
    const { response }: ITransactionalStatementsResponse = yield call(
      Request[EActionTypes.fetchTransactionalStatements](),
      payload,
    );
    yield put(Action.ac_saveTransactionalStatements(new Model.MTransactionalStatementData(response.data)));
    return response.data;
  });
}

export function* addDepositSaga() {
  yield $$(EActionTypes.addDeposit, function* ({ payload }: IAction) {
    const response: IAddDepositResponse = yield call(Request[EActionTypes.addDeposit](), payload);
    yield delay(5000);
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    return response;
  });
}

export function* partnershipRegistrationSaga() {
  yield $$(EActionTypes.partnershipRegister, function* ({ payload }: IAction) {
    const { response }: IPartnershipRegistrationResponse = yield call(
      Request[EActionTypes.partnershipRegister](),
      payload,
    );
    return response;
  });
}

export function* sendReferrerLinkSaga() {
  yield $$(EActionTypes.sendReferrerLink, function* ({ payload }: IAction) {
    const { response }: ISendReferrerLinkResponse = yield call(Request[EActionTypes.sendReferrerLink](), payload);
    return response;
  });
}

export function* changeAccountLeverageSaga() {
  yield $$(EActionTypes.changeAccountLeverage, function* ({ payload }: IAction) {
    const { response }: IChangeAccountLeverageResponse = yield call(
      Request[EActionTypes.changeAccountLeverage](),
      payload,
    );
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    return response;
  });
}

export function* changeAccountSettingsSaga() {
  yield $$(EActionTypes.changeAccountSettings, function* ({ payload }: IAction) {
    const { response }: IChangeAccountSettingsResponse = yield call(
      Request[EActionTypes.changeAccountSettings](),
      payload,
    );
    yield put(Action.ac_fetchTradingAccounts({ force: true }));
    return response;
  });
}

export function* changeAccountPasswordSaga() {
  yield $$(EActionTypes.changeAccountPassword, function* ({ payload }: IAction) {
    const { response }: IChangeAccountPasswordResponse = yield call(
      Request[EActionTypes.changeAccountPassword](),
      payload,
    );
    console.log(response);
    return response;
  });
}

export function* registerIBSaga() {
  yield $$(EActionTypes.partnershipRegisterIB, function* ({ payload }: IAction) {
    const { response }: IPartnershipIBRegistrationResponse = yield call(
      Request[EActionTypes.partnershipRegisterIB](),
      payload,
    );
    return response;
  });
}

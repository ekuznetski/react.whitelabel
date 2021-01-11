import { EHttpMethod, EResponseStatus } from '@domain/enums';
import { env } from '@env';
import axios from 'axios';
import mockData from './api.mock.json';

export function request<T extends { [K: string]: any }>(method: EHttpMethod, requestPath: string) {
  return async (data: T | null = null) => {
    if (data) {
      const formData = new FormData();
      Object.keys(data).map((el: string) => {
        formData.set(el, (data as T)[el]);
      });
      data = formData as any;
    }

    try {
      // RETURN MOCK RESPONSE
      const props = requestPath.replace(`${env.API_URL}/`, '').split('/');
      const mockResponse = props.reduce((acc: any, key) => acc[key] || {}, mockData);
      if (Object.keys(mockResponse).length) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockResponse), 450);
        });
      }
      // END MOCK RESPONSE

      if (method === EHttpMethod.get) {
        return axios[method](requestPath, { withCredentials: true })
          .then((e: any) => {
            if (
              (e.data?.response?.status && e.data.response.status === EResponseStatus.failure) ||
              (e.data?.status && e.data.status === EResponseStatus.failure)
            ) {
              throw e;
            } else {
              return e.data;
            }
          })
          .catch((err: any) => {
            throw err.response;
          });
      } else {
        // @ts-ignore
        return axios[method](requestPath, data, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        })
          .then((e: any) => {
            if (
              (e.data?.response?.status && e.data.response.status === EResponseStatus.failure) ||
              (e.data?.status && e.data.status === EResponseStatus.failure)
            ) {
              throw e;
            } else {
              return e.data;
            }
          })
          .catch((err: any) => {
            throw err.response;
          });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

// export const getContentRequest = request(EHttpMethod.get, `https://baconipsum.com/api/?type=meat-and-filler`);
// export const getContentRequest = (d: any) => new Promise((resolve, reject) => resolve({}));
export const getGeoIpRequest = request(EHttpMethod.get, `${env.API_URL}/frontend/geoIp`);
export const getProfileRequest = request(EHttpMethod.post, `${env.API_URL}/clients/getProfile`);
export const editProfileRequest = request(EHttpMethod.post, `${env.API_URL}/clients/editProfile`);
export const changeClientProfilePassword = request(EHttpMethod.post, `${env.API_URL}/clients/changePassword`);
export const getClientDataRequest = request(EHttpMethod.get, `${env.API_URL}/clients/getClientData`);
export const loginRequest = request(EHttpMethod.post, `${env.API_URL}/clients/login`);
export const logoutRequest = request(EHttpMethod.post, `${env.API_URL}/clients/logout`);
export const clientSetProfileRequest = request(EHttpMethod.post, `${env.API_URL}/clients/setProfile`);
export const clientAddRequest = request(EHttpMethod.post, `${env.API_URL}/clients/add`);
export const forgotPasswordRequest = request(EHttpMethod.post, `${env.API_URL}/clients/forgotPassword`);
export const resetPasswordRequest = request(EHttpMethod.post, `${env.API_URL}/clients/resetPassword`);
export const userExistsRequest = request(EHttpMethod.post, `${env.API_URL}/clients/exist`);
export const withdrawalsHistoryRequest = request(EHttpMethod.get, `${env.API_URL}/withdrawals/getHistory`);
export const withdrawalsLimitRequest = request(EHttpMethod.post, `${env.API_URL}/withdrawals/limit`);
export const mt4WithdrawFundsRequest = request(EHttpMethod.post, `${env.API_URL}/withdrawals/mt4`);
export const mt5WithdrawFundsRequest = request(EHttpMethod.post, `${env.API_URL}/withdrawals/mt5`);
export const tradingAccountsRequest = request(EHttpMethod.get, `${env.API_URL}/clients/getTradingAccounts`);
export const financialProfileRequest = request(EHttpMethod.post, `${env.API_URL}/clients/newKyc`);
export const internalTransferRequest = request(EHttpMethod.post, `${env.API_URL}/accounts/transfer`);
export const getTransactionalStatementsRequest = request(EHttpMethod.post, `${env.API_URL}/clients/bankingStatements`);
export const getBankDetailsRequest = request(EHttpMethod.post, `${env.API_URL}/bankDetails/get`);
export const updateBankDetailsRequest = request(EHttpMethod.post, `${env.API_URL}/bankDetails/update`);
export const createMT4LiveAccountRequest = request(EHttpMethod.post, `${env.API_URL}/mt4accounts/create`);
export const createMT4DemoAccountRequest = request(EHttpMethod.post, `${env.API_URL}/mt4accounts/demo/create`);
export const createMT5LiveAccountRequest = request(EHttpMethod.post, `${env.API_URL}/mt5accounts/create`);
export const createMT5DemoAccountRequest = request(EHttpMethod.post, `${env.API_URL}/mt5accounts/demo/create`);
export const addDepositRequest = request(EHttpMethod.post, `${env.API_URL}/deposits/add`);
export const uploadFileRequest = request(EHttpMethod.post, `${env.API_URL}/v2/documents/upload`);
export const getDocumentsRequest = request(EHttpMethod.post, `${env.API_URL}/v2/documents/getDocuments`);
export const partnershipRegistrationRequest = request(EHttpMethod.post, `${env.API_URL}/partnership/add`);
export const partnershipIBRegistrationRequest = request(EHttpMethod.post, `${env.API_URL}/partnership/addIB`);
export const getStocksPricesRequest = request(EHttpMethod.post, `https://prices.hycm.com/graphs/prices2`);
export const getClientSettingsRequest = request(EHttpMethod.post, `${env.API_URL}/clients/settings`);
export const updateTinsRequest = request(EHttpMethod.post, `${env.API_URL}/clients/updateTins`);
export const submitEddRequest = request(EHttpMethod.post, `${env.API_URL}/edd/submit`);
export const changeAccountLeverageRequest = request(EHttpMethod.post, `${env.API_URL}/mt4accounts/changeLeverage`); // TODO update path when Ralph update endpoint
export const changeAccountPasswordRequest = request(EHttpMethod.post, `${env.API_URL}/mt5accounts/changePassword`); // TODO update path when Ralph update endpoint
export const changeAccountSettingsRequest = request(EHttpMethod.post, `${env.API_URL}/clients/editFakeAccount`); // TODO update path when Ralph update endpoint

import { EHttpMethod, EResponseStatus } from '@domain/enums';
import { env } from '@env';
import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import mockData from './api.mock.json';

function request<T extends { [K: string]: any }>(method: EHttpMethod, requestPath: string, formData = false) {
  return async (data: T | null = null) => {
    try {
      // RETURN MOCK RESPONSE
      const props = requestPath.replace(new RegExp(`(${env.API_URL}|${env.PROXY_URL})\/`, 'g'), '').split('/');
      const mockResponse = props.reduce((acc: any, key) => acc[key] || {}, mockData);
      if (Object.keys(mockResponse).length) {
        return new Promise((resolve, reject) => {
          if (
            (mockResponse.response?.status && mockResponse.response?.status === EResponseStatus.failure) ||
            (mockResponse.status && mockResponse.status === EResponseStatus.failure)
          ) {
            setTimeout(() => reject(mockResponse.response), 450);
          } else {
            setTimeout(() => resolve(mockResponse), 450);
          }
        });
      }
      // END MOCK RESPONSE

      const options: AxiosRequestConfig = {
        headers: Object.assign(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          window.isSSR && window.CakePHPCookie ? { Cookie: window.CakePHPCookie } : {},
        ),
        method: method as Method,
        withCredentials: true,
        data: qs.stringify(data),
      };

      if (formData && data) {
        const formData = new FormData();
        Object.keys(data).map((el: string) => {
          formData.append(el, (data as T)[el]);
        });

        Object.assign(options, {
          headers: Object.assign(options.headers, {
            'Content-Type': 'multipart/form-data',
          }),
          data: formData,
        });
      }

      return axios(requestPath, options)
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
          throw err.response || err;
        });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

// export const getContentRequest = request(EHttpMethod.get, `https://baconipsum.com/api/?type=meat-and-filler`);
// export const getContentRequest = (d: any) => new Promise((resolve, reject) => resolve({}));
export const getGeoIpRequest = request(EHttpMethod.get, `${env.PROXY_URL}/frontend/xwayz`);
export const getProfileRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/getProfile`);
export const editProfileRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/editProfile`);
export const changeClientProfilePassword = request(EHttpMethod.post, `${env.PROXY_URL}/clients/changePassword`);
export const getClientDataRequest = request(EHttpMethod.get, `${env.PROXY_URL}/clients/getClientData`);
export const loginRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/login`);
export const logoutRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/logout`);
export const clientSetProfileRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/setProfile`);
export const clientAddRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/add`);
export const forgotPasswordRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/forgotPassword`);
export const resetPasswordRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/resetPassword`);
export const userExistsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/exist`);
export const withdrawalsHistoryRequest = request(EHttpMethod.get, `${env.PROXY_URL}/withdrawals/getHistory`);
export const withdrawalsLimitRequest = request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/limit`);
export const mt4WithdrawFundsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/mt4`);
export const mt5WithdrawFundsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/mt5`);
export const tradingAccountsRequest = request(EHttpMethod.get, `${env.PROXY_URL}/clients/getTradingAccounts`);
export const financialProfileRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/newKyc`);
export const internalTransferRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/transfer`);
export const getTransactionalStatementsRequest = request(
  EHttpMethod.post,
  `${env.PROXY_URL}/clients/bankingStatements`,
);
export const getBankDetailsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/bankDetails/get`);
export const updateBankDetailsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/bankDetails/update`);
export const createMT4LiveAccountRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/create`);
export const createMT4DemoAccountRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/demo/create`);
export const createMT5LiveAccountRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/create`);
export const createMT5DemoAccountRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/demo/create`);
export const changeAccountPasswordRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/changePassword`); // TODO update path when Ralph update endpoint
export const changeAccountLeverageRequest = request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/changeLeverage`); // TODO update path when Ralph update endpoint
export const addDepositRequest = request(EHttpMethod.post, `${env.PROXY_URL}/deposits/add`);
export const uploadFileRequest = request(EHttpMethod.post, `${env.PROXY_URL}/v2/documents/upload`, true);
export const getDocumentsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/v2/documents/getDocuments`);
export const partnershipRegistrationRequest = request(EHttpMethod.post, `${env.PROXY_URL}/partnership/add`);
export const partnershipIBRegistrationRequest = request(EHttpMethod.post, `${env.PROXY_URL}/partnership/addIB`);
export const sendReferrerLinkRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/sendReferrerLink`);
export const getClientSettingsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/settings`);
export const updateTinsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/updateTins`);
export const submitEddRequest = request(EHttpMethod.post, `${env.PROXY_URL}/edd/submit`);
export const changeAccountSettingsRequest = request(EHttpMethod.post, `${env.PROXY_URL}/clients/editFakeAccount`); // TODO update path when Ralph update endpoint
export const getPricesRequest = request(EHttpMethod.get, `${env.API_URL.replace('api', 'prices')}/graphs/homepage`); // TODO uncomment when cors will be fixed
// export const getPricesRequest = request(EHttpMethod.get, `${env.PROXY_URL}/graphs/homepage`);

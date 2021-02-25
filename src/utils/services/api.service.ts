import { EHttpMethod, EResponseStatus } from '@domain/enums';
import { env } from '@env';
import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import { mockData } from './';
import { EActionTypes } from '../../store/store.enum';

function request<T extends { [K: string]: any }>(method: EHttpMethod, requestPath: string, formData = false) {
  return function (ssrToken: string | null = null) {
    return async (data: T | null = null) => {
      try {
        // RETURN MOCK RESPONSE
        const props = requestPath
          .replace(new RegExp(`(${env.API_URL}|${env.PROXY_URL}|${env.PRICES_URL})\/`, 'g'), '')
          .split('/');
        const mockResponse = props.reduce((acc: any, key) => acc[key] || {}, mockData);
        if (Object.keys(mockResponse).length) {
          return new Promise((resolve, reject) => {
            if (
              (mockResponse.response?.status && mockResponse.response?.status === EResponseStatus.failure) ||
              (mockResponse.status && mockResponse.status === EResponseStatus.failure)
            ) {
              setTimeout(() => reject(mockResponse.response), 450);
            } else {
              setTimeout(
                () =>
                  resolve(
                    window.isSSR
                      ? {
                          url: requestPath
                            .replace(new RegExp(`(${env.API_URL}|${env.PROXY_URL}|${env.PRICES_URL})\/`, 'g'), '')
                            .split('/')
                            .slice(-1)[0],
                          data: mockResponse,
                        }
                      : mockResponse,
                  ),
                450,
              );
            }
          });
        }
        // END MOCK RESPONSE

        const options: AxiosRequestConfig = {
          headers: Object.assign(
            {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            window.isSSR && window.xRealIP ? { xRealIP: window.xRealIP } : {},
            window.isSSR && ssrToken ? { Cookie: ssrToken } : {},
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
              return window.isSSR
                ? {
                    url: requestPath
                      .replace(new RegExp(`(${env.API_URL}|${env.PROXY_URL}|${env.PRICES_URL})\/`, 'g'), '')
                      .split('/')
                      .slice(-1)[0],
                    data: e.data,
                  }
                : e.data;
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
  };
}

export const Request: { [k: string]: ReturnType<typeof request> } = {
  [EActionTypes.fetchGeoIpData]: request(EHttpMethod.get, `${env.PROXY_URL}/frontend/xwayz`),
  [EActionTypes.fetchProfile]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/getProfile`),
  [EActionTypes.editProfile]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/editProfile`),
  [EActionTypes.changePassword]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/changePassword`),
  [EActionTypes.fetchClientData]: request(EHttpMethod.get, `${env.PROXY_URL}/clients/getClientData`),
  [EActionTypes.login]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/login`),
  [EActionTypes.logout]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/logout`),
  [EActionTypes.register]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/setProfile`),
  [EActionTypes.preRegister]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/add`),
  [EActionTypes.forgotPassword]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/forgotPassword`),
  [EActionTypes.resetPassword]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/resetPassword`),
  [EActionTypes.userExists]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/exist`),
  [EActionTypes.fetchWithdrawHistory]: request(EHttpMethod.get, `${env.PROXY_URL}/withdrawals/getHistory`),
  [EActionTypes.fetchWithdrawLimit]: request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/limit`),
  [EActionTypes.withdrawMt4Funds]: request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/mt4`),
  [EActionTypes.withdrawMt5Funds]: request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/mt5`),
  [EActionTypes.cancelWithdraw]: request(EHttpMethod.post, `${env.PROXY_URL}/withdrawals/cancel`),
  [EActionTypes.fetchTradingAccounts]: request(EHttpMethod.get, `${env.PROXY_URL}/clients/getTradingAccounts`),
  [EActionTypes.submitFinancialProfile]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/newKyc`),
  [EActionTypes.makeInternalTransfer]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/transfer`),
  [EActionTypes.fetchTransactionalStatements]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/bankingStatements`),
  [EActionTypes.fetchBankDetails]: request(EHttpMethod.post, `${env.PROXY_URL}/bankDetails/get`),
  [EActionTypes.updateBankDetails]: request(EHttpMethod.post, `${env.PROXY_URL}/bankDetails/update`),
  [EActionTypes.createMt4LiveTradingAccount]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/create`),
  [EActionTypes.createMt4DemoTradingAccount]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/demo/create`),
  [EActionTypes.createMt5LiveTradingAccount]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/create`),
  [EActionTypes.createMt5DemoTradingAccount]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/demo/create`),
  [EActionTypes.changeAccountPassword]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt5/changePassword`), // TODO update path when Ralph update endpoin,
  [EActionTypes.changeAccountLeverage]: request(EHttpMethod.post, `${env.PROXY_URL}/accounts/mt4/changeLeverage`), // TODO update path when Ralph update endpoin,
  [EActionTypes.addDeposit]: request(EHttpMethod.post, `${env.PROXY_URL}/deposits/add`),
  [EActionTypes.uploadDocuments]: request(EHttpMethod.post, `${env.PROXY_URL}/v2/documents/upload`, true),
  [EActionTypes.partnershipRegister]: request(EHttpMethod.post, `${env.PROXY_URL}/partnership/add`),
  [EActionTypes.partnershipRegisterIB]: request(EHttpMethod.post, `${env.PROXY_URL}/partnership/addIB`),
  [EActionTypes.sendReferrerLink]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/sendReferrerLink`),
  [EActionTypes.fetchClientSettings]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/settings`),
  [EActionTypes.updateTins]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/updateTins`),
  [EActionTypes.submitEdd]: request(EHttpMethod.post, `${env.PROXY_URL}/edd/submit`),
  [EActionTypes.changeAccountSettings]: request(EHttpMethod.post, `${env.PROXY_URL}/clients/editFakeAccount`), // TODO update path when Ralph update endpoin,
  [EActionTypes.fetchPrices]: request(EHttpMethod.get, `${env.PRICES_URL}/graphs/homepage`), // TODO uncomment when cors will be fixe,
};

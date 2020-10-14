import { EHttpMethod, EResponseStatus } from '@domain/enums';
import axios from 'axios';
import mockData from './api.mock.json';

const apiUrl = 'https://api.hycm.com';

export function request<T extends { [K: string]: any }>(method: EHttpMethod, path: string) {
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
      const [c, s] = path.split('/').splice(-2);
      const mockResponse = (mockData as any)?.[c]?.[s];
      if (mockResponse) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockResponse), 450);
        });
      }
      // END MOCK RESPONSE

      if (method === EHttpMethod.get) {
        return axios[method](path, { withCredentials: true }).then((e: any) => {
          if (
            (e.data?.response?.status && e.data.response.status === EResponseStatus.failure) ||
            (e.data?.status && e.data.status === EResponseStatus.failure)
          ) {
            throw new Error(e);
          } else {
            return e.data;
          }
        });
      } else {
        // @ts-ignore
        return axios[method](path, data, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }).then((e: any) => {
          if (
            (e.data?.response?.status && e.data.response.status === EResponseStatus.failure) ||
            (e.data?.status && e.data.status === EResponseStatus.failure)
          ) {
            throw new Error(e);
          } else {
            return e.data;
          }
        });
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };
}

// export const getContentRequest = request(EHttpMethod.get, `https://baconipsum.com/api/?type=meat-and-filler`);
export const getContentRequest = (d: any) => new Promise((resolve, reject) => resolve({}));
export const getGeoIpRequest = request(EHttpMethod.get, `${apiUrl}/frontend/geoIp`);
export const getProfileRequest = request(EHttpMethod.post, `${apiUrl}/clients/getProfile`);
export const editProfileRequest = request(EHttpMethod.post, `${apiUrl}/clients/editProfile`);
export const getClientDataRequest = request(EHttpMethod.get, `${apiUrl}/clients/getClientData`);
export const loginRequest = request(EHttpMethod.post, `${apiUrl}/clients/login`);
export const logoutRequest = request(EHttpMethod.post, `${apiUrl}/clients/logout`);
export const clientSetProfileRequest = request(EHttpMethod.post, `${apiUrl}/clients/setProfile`);
export const clientAddRequest = request(EHttpMethod.post, `${apiUrl}/clients/add`);
export const forgotPasswordRequest = request(EHttpMethod.post, `${apiUrl}/clients/forgotPassword`);
export const resetPasswordRequest = request(EHttpMethod.post, `${apiUrl}/clients/resetPassword`);
export const userExistsRequest = request(EHttpMethod.post, `${apiUrl}/clients/exist`);
export const withdrawalsHistoryRequest = request(EHttpMethod.get, `${apiUrl}/withdrawals/getHistory`);
export const withdrawalsLimitRequest = request(EHttpMethod.post, `${apiUrl}/withdrawals/limit`);
export const mt4WithdrawFundsRequest = request(EHttpMethod.post, `${apiUrl}/withdrawals/mt4`);
export const mt5WithdrawFundsRequest = request(EHttpMethod.post, `${apiUrl}/withdrawals/mt5`);
export const tradingAccountsRequest = request(EHttpMethod.get, `${apiUrl}/clients/getTradingAccounts`);
export const internalTransferRequest = request(EHttpMethod.post, `${apiUrl}/accounts/transfer`);
export const getTransactionalStatementsRequest = request(EHttpMethod.post, `${apiUrl}/clients/bankingStatements`);
export const getBankDetailsRequest = request(EHttpMethod.post, `${apiUrl}/bankaccounts/getbankdetails`);
export const updateBankDetailsRequest = request(EHttpMethod.post, `${apiUrl}/bankaccounts/saveaccount`);

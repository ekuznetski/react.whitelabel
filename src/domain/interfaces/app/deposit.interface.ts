import { IBaseResponse } from '../general.interface';
import { EDepositMethodCode } from '@domain/enums';

export interface ICreditCardDepositRequest {
  firstName: string;
  surname: string;
  city: string;
  street: string;
  postcode: string;
  amount: string;
  cardNumber: string;
  currency: string;
  countryCode: string;
  nameOnCard: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  paymentMethod: EDepositMethodCode.creditCard;
  tradePlatform?: string;
  tradeAccount?: string;
}

export interface INetellerDepositRequest {
  amount: string;
  currency: string;
  PaymentMethod: EDepositMethodCode.neteller;
  net_username: string;
  net_password: string;
  trade_account?: string;
  trade_platform?: string;
}
export interface ISkrillDepositRequest {
  PaymentMethod: EDepositMethodCode.skrill;
  trade_account?: string;
  trade_platform?: string;
  first_name: string;
  surname: string;
  city: string;
  postcode: string;
  email: string;
  amount: string;
  currency: string;
  country_code: string;
  language_code: string;
}

export interface IWebmoneyDepositRequest {
  PaymentMethod: EDepositMethodCode.webmoney;
  amount: string;
  trade_account?: string;
  trade_platform?: string;
  currency: string;
}

export type IAddDepositResponse = {
  response: any;
} & IBaseResponse;

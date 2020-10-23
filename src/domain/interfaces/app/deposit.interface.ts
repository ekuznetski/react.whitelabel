import { IBaseResponse } from '../general.interface';
import { EDepositMethodCode } from '@domain/enums';

export interface ICreditCardDepositRequest {
  amount: string;
  currency?: string;
  PaymentMethod: EDepositMethodCode.creditCard;
  first_name: string;
  surname: string;
  postcode: string;
  city: string;
  country: string;
  country_code: string;
  phone: string;
  email: string;
  address: string;
  language_code: string;
  name_on_card: string;
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  trade_platform?: string;
  trade_account?: string;
  deposit_ip: string;
  state_code?: string;
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

import { IBaseResponse } from '../general.interface';
import { IClientProfileResponse } from './clientProfile.interface';

export interface IClientAddRequest {
  first_name: string;
  surname: string;
  email: string;
  language: string;
  mobile: number;
  country: string;
  phone_prefix: number;
  phone: number;
  phone_country_code: string;
  campaign_id?: string;
}

export type IClientAddResponse = {
  response: {
    data: string;
    userId: string;
  };
} & IBaseResponse;

export type ISetProfileResponse = {
  response: {
    userId: string;
  };
} & IBaseResponse;

export interface ISetProfileRequest {
  username: string;
  password: string;
  dob: string;
  country: string;
  city: string;
  street: string;
  firstdeposit_platform: string;
  account_type: string;
  currency: string;
  tax_country: string;
  uscitizen: string;
  domain: string;
}

export interface ILogin {
  phone_verification: string;
  show_promotions: boolean;
  show_compliance_popup: boolean;
  switch_cayman: boolean;
}

export interface IUserExistsRequest {
  username: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IResetPasswordRequest {
  token: string;
  username: string;
  password: string;
}
export type ILoginResponse = {
  response: ILogin;
} & IBaseResponse &
  IClientProfileResponse;

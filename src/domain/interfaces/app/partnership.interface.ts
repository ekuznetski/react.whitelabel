import { IBaseResponse } from '../general.interface';

export interface IPartnershipRegistrationRequest {
  program: string;
  lang: string;
  email: string;
  name: string;
  phone: number;
  message: string;
}

export type IPartnershipRegistrationResponse = IBaseResponse;

export interface IPartnershipIBRegistrationRequest {
  first_name: string;
  surname: string;
  email: string;
  company: string;
  phone_prefix: string;
  phone: number;
  country: string;
  address: string;
  lang: string;
  language: string;
}

export type IPartnershipIBRegistrationResponse = IBaseResponse;

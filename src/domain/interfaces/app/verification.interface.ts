import { IBaseResponse } from '../general.interface';

export interface IEdd {
  nationality?: string;
  own_property?: number;
  address?: string;
  previous_address?: string;
  years_address?: number;
  employment_status?: string;
  employer_name?: string;
  nature_of_business?: string;
  position?: string;
  years_employment?: number;
  working_financial?: number;
  employer_address?: string;
  phone?: number;
  other_income?: string;
  appr_annual_income?: string;
  appr_net_worth?: string;
  funds_available?: string;
  pr_employer_name?: string;
  pr_nature_of_business?: string;
  pr_position?: string;
  pr_years_employment?: number;
  pr_location_employment?: string;
  pr_appr_annual_income?: string;
}

export type IEddResponse = {
  response: IEdd;
} & IBaseResponse;

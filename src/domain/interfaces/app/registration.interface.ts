import { ERegSteps } from '@components/pages';

export interface IRegStep1Data {
  first_name: string;
  surname: string;
  email: string;
  phoneCode: string;
  phone: string;
  mobile: 1 | 0;
  language: string;
  promotion: string;
  country: string;
}
export interface IRegStep2Data {
  tax_checkbox: string;
  tax_country: string;
  country: string;
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
  street: string;
  city: string;
  zip: string;
}
export interface IRegStep3Data {
  firstdeposit_platform: string;
  account_type: string;
  currency: string;
  leverage: string;
}
export interface IRegStep4Data {
  usCitizen: string;
  pep: string;
  password: string;
  confirmPassword: string;
}
export interface IRegStep5Data {
  declaration: string;
}

export interface IRegData {
  [ERegSteps.step1]: IRegStep1Data;
  [ERegSteps.step2]: IRegStep2Data;
  [ERegSteps.step3]: IRegStep3Data;
  [ERegSteps.step4]: IRegStep4Data;
  [ERegSteps.step5]: IRegStep5Data;
}

import { IBaseResponse } from '../general.interface';
import { _statusPair, ITins, IDocument, IMifidData } from '..';
import { EResponseStatus } from '@domain/enums';

export type AddInfoFormStatus =
  | _statusPair<'notApplicable'>
  | _statusPair<'submitted'>
  | _statusPair<'required'>
  | _statusPair<'notRequired'>;

export interface IClientStatus {
  status: EResponseStatus;
  fp_status: _statusPair<'submitted'> | _statusPair<'required'>;
  document_status: _statusPair<'submitted'> | _statusPair<'required'>;
  client_status:
    | _statusPair<'clientApproved'>
    | _statusPair<'clientEddRequired'>
    | _statusPair<'clientLiquidOnly'>
    | _statusPair<'liquidOnlyEdd'>
    | _statusPair<'liquidOnlyMifir'>
    | _statusPair<'onReview'>
    | _statusPair<'dormant'>;
  cayman_status:
    | _statusPair<'onReview'>
    | _statusPair<'clientLiquidOnly'>
    | _statusPair<'liquidOnlyEdd'>
    | _statusPair<'liquidOnlyMifir'>;
  edd_status: AddInfoFormStatus;
  mifid_status: AddInfoFormStatus;
  tins_status: AddInfoFormStatus;
  dual_status: AddInfoFormStatus;
}

export type ClientEDDKeys =
  | 'nationality'
  | 'address'
  | 'own_property'
  | 'years_address'
  | 'previous_address'
  | 'employment_status'
  | 'employer_name'
  | 'nature_of_business'
  | 'position'
  | 'years_employment'
  | 'working_financial'
  | 'employer_address'
  | 'phone'
  | 'appr_annual_income'
  | 'appr_net_worth'
  | 'funds_available'
  | 'other_income'
  | 'pr_employer_name'
  | 'pr_nature_of_business'
  | 'pr_position'
  | 'pr_years_employment'
  | 'pr_appr_annual_income'
  | 'pr_location_employment]';

export type IClientStatusData = IClientData & IClientStatus;
export type _updatedData<T> = { updated_data: T };

export type IEDDData = {
  [K in ClientEDDKeys]: string | number | boolean;
};

export interface IClientData {
  document_data?: IDocument[] & _updatedData<IDocument[]>;
  edd_data: IEDDData & _updatedData<IEDDData>;
  mifid_data: IMifidData & _updatedData<IMifidData>;
  tins_data: ITins & _updatedData<ITins>;
  dual_data: IDualNationalityData;
}

export type ITinsDataSubmit = { tins: { country: string; tax_number: string }[]; reason: string };
export type IMifidDataSubmit = { [K: string]: string | number | boolean };
export type IEDDDataSubmit = IEDDData;
export type IDocumentsSubmit = { blob: File; type: string }[];

export type IDualNationalityData = {
  choice?: string;
  nationality?: string;
  dual_nationality?: string;
};

export interface IClientDataSubmit {
  document_data?: IDocumentsSubmit;
  edd_data: IEDDDataSubmit;
  mifid_data: IMifidDataSubmit;
  tins_data: ITinsDataSubmit;
}

export type IClientStatusDataResponse = {
  response: IClientStatusData;
} & IBaseResponse;

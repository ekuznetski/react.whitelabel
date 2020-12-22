import { IBaseResponse } from '../general.interface';
import { _statusPair, ITins, IDocument, IMifidData, IEdd } from '..';
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
    | _statusPair<'onReview'>
    | _statusPair<'dormant'>;
  cayman_status: _statusPair<'onReview'> | _statusPair<'clientLiquidOnly'> | _statusPair<'liquidOnlyEdd'>;
  edd_status: AddInfoFormStatus;
  tins_status: AddInfoFormStatus;
  dual_status: AddInfoFormStatus;
}

export type IClientStatusData = IClientData & IClientStatus;
export type _updatedData<T> = { updated_data: T };

export interface IClientData {
  document_data?: IDocument[] & _updatedData<IDocument[]>;
  edd_data: IEdd & _updatedData<IEdd>;
  tins_data: ITins & _updatedData<ITins>;
  dual_data: IDualNationalityData;
}

export type ITinsDataSubmit = { tins: { country: string; tax_number: string }[]; reason: string };
export type IDocumentsSubmit = { blob: File; type: string }[];

export type IDualNationalityData = {
  choice?: string;
  nationality?: string;
  dual_nationality?: string;
};

export interface IClientDataSubmit {
  document_data?: IDocumentsSubmit;
  tins_data: ITinsDataSubmit;
}

export type IClientStatusDataResponse = {
  response: IClientStatusData;
} & IBaseResponse;

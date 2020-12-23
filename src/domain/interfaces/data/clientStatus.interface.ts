import { EResponseStatus } from '@domain/enums';
import { IDocument, IEdd, ITins, _statusPair } from '..';
import { IBaseResponse } from '../general.interface';

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
}

export type IClientStatusDataResponse = {
  response: IClientStatusData;
} & IBaseResponse;

import { EClientStatusCode, ClientStatusCodeNotificationType } from '@domain/enums';
import { AddInfoFormStatus, IClientStatusData, _statusPair } from '@domain/interfaces';

export class MClientStatus {
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

  constructor(props: IClientStatusData) {
    this.fp_status = {
      ...props.fp_status,
      notificationType: ClientStatusCodeNotificationType[props.fp_status.code],
    };
    this.document_status = {
      ...props.document_status,
      notificationType: ClientStatusCodeNotificationType[props.document_status.code],
    };
    this.client_status = {
      ...props.client_status,
      notificationType: ClientStatusCodeNotificationType[props.client_status.code],
    };
    this.cayman_status = {
      ...props.cayman_status,
      notificationType: ClientStatusCodeNotificationType[props.cayman_status.code],
    };
    this.edd_status = {
      ...props.edd_status,
      notificationType: ClientStatusCodeNotificationType[props.edd_status.code],
    };
    this.tins_status = {
      ...props.tins_status,
      notificationType: ClientStatusCodeNotificationType[props.tins_status.code],
    };
    this.dual_status = {
      ...props.dual_status,
      notificationType: ClientStatusCodeNotificationType[props.dual_status.code],
    };
  }

  get isApproved(): boolean {
    return this.client_status?.code === EClientStatusCode.clientApproved;
  }

  // Client didn't login or trade for 90 days
  get isDormant(): boolean {
    return this.client_status?.code === EClientStatusCode.dormant;
  }

  get isNotApprovedAndNotDormant(): boolean {
    return !this.isApproved && !this.isDormant;
  }
}

import { EClientStatusCode, EDocumentsType } from '@domain/enums';
import { IClientStatus, TClientStatus } from '@domain/interfaces';
import { generateStatus } from '@utils/fn/generateStatus';

export class MClientStatus {
  fp_status: TClientStatus;
  client_status: TClientStatus;
  cayman_status: TClientStatus;
  edd_status: TClientStatus;
  tins_status: TClientStatus;
  dual_status: TClientStatus;

  constructor(props: IClientStatus, castType = false) {
    this.fp_status = generateStatus(props.fp_status?.message);
    this.client_status = generateStatus(props.client_status?.message);
    this.cayman_status = generateStatus(props.cayman_status?.message);
    this.edd_status = generateStatus(props.edd_status?.message);
    this.tins_status = generateStatus(props.tins_status?.message);
    this.dual_status = generateStatus(props.dual_status?.message);

    if (castType) return this;
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

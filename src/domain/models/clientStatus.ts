import { EClientStatusCode } from '@domain/enums';
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
    this.fp_status = generateStatus(props.fp_status?.code);
    this.client_status = generateStatus(props.client_status?.code);
    this.cayman_status = generateStatus(props.cayman_status?.code);
    this.edd_status = generateStatus(props.edd_status?.code);
    this.tins_status = generateStatus(props.tins_status?.code);
    this.dual_status = generateStatus(props.dual_status?.code);

    if (castType) return this;
  }

  get isNotVerified(): boolean {
    return (
      this.fp_status.code === EClientStatusCode.required ||
      this.edd_status.code === EClientStatusCode.required ||
      this.tins_status.code === EClientStatusCode.required ||
      this.dual_status.code === EClientStatusCode.required
    );
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

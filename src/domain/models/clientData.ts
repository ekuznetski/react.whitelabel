import { EClientStatusCode } from '@domain/enums';
import { AddInfoFormStatus, IClientStatusData, _statusPair } from '@domain/interfaces';

export class MClientData {
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

	constructor(props: IClientStatusData) {
		this.fp_status = props.fp_status;
		this.document_status = props.document_status;
		this.client_status = props.client_status;
		this.cayman_status = props.cayman_status;
		this.edd_status = props.edd_status;
		this.mifid_status = props.mifid_status;
		this.tins_status = props.tins_status;
		this.dual_status = props.dual_status;
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

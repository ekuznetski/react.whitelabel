import { ECurrencyCode, ETaskStatus, ETaskStatusCode } from '@domain/enums';
import { IWithdrawalHistory } from '@domain/interfaces';
import moment from 'moment';

export class MWithdrawalHistoryItem {
	currency: ECurrencyCode;
	amount: number;
	issueDate: moment.Moment;
	accountId: string;
	status: ETaskStatus;
	items:
		| {
				issueDate: moment.Moment;
				reference: string;
				paymentMethod: string;
				amount: number;
		  }[]
		| null;

	constructor(props: IWithdrawalHistory) {
		this.amount = props.amount;
		this.accountId = props.account;

		this.issueDate = moment(props.date);
		this.currency = ECurrencyCode[props.currency.toLowerCase() as keyof typeof ECurrencyCode] || ECurrencyCode.usd;
		this.status = ETaskStatus[ETaskStatusCode[props.status_code] as keyof typeof ETaskStatusCode];
		this.items = props.details
			? props.details.map((item) => ({
					issueDate: moment(item.settlement_date),
					reference: item.reference,
					paymentMethod: item.method,
					amount: item.amount,
			  }))
			: null;
	}
}

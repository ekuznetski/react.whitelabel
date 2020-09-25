import { IBaseResponse } from '../general.interface';

export interface IClientProfile {
	email: string;
	username: string;
	first_name: string;
	surname: string;
	country: string;
	state: string | null;
	street: string;
	city: string;
	postcode: string;
	phone_prefix: string;
	phone: string;
	dob: string;
	account_type: string;
	affiliate_code: string | null;
	raf_id: string | null;
	nationality: string;
	dual_nationality: string;
	ic_hash: string;
	jurisdiction: string;
	userId: string;
	sfid: string;
	ftd: boolean;
	trading_central: boolean;
	aprv: boolean;
	curr: string;
	brand: string;
	manager: string;
	regDate: string;
	go_to_praxis: boolean;
	show_praxis_and_webmoney: boolean;
	enable_citioptions: boolean;
	allow_additional_account: boolean;
	allow_additional_live_account: boolean;
	allow_additional_demo_account: boolean;
	allow_deposit: boolean;
	allowed_currencies: string[];
	allowed_leverages: number[];
	allowed_account_types: string[];
	allowed_platforms: string[];
	is_withdrawal_allowed: boolean;
	allow_internal_transfer: boolean;
	edit_fake_account: boolean;
}

export type IClientProfileResponse = {
	response: {
		message: IClientProfile;
	};
} & IBaseResponse;

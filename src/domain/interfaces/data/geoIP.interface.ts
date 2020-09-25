export interface IGeoIp {
	country: string;
	countryCode: string;
	phonePrefix: string;
	dynamicLeverage: boolean;
	leverages: string[];
	currencies: string[];
	jurisdiction: string;
	companyName: string;
	domain: string;
	redirect_popup: boolean;
	redirect_url: string;
	redirect_url_full: string;
	passive_consent: boolean;
}

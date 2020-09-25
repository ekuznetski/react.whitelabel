export enum ECurrency {
	usd = 'usd',
	gbp = 'gbp',
	eur = 'eur',
	aed = 'aed',
	rub = 'rub',
	cad = 'cad',
}

export enum ECurrencyCode {
	usd = 'USD',
	gbp = 'GBP',
	eur = 'EUR',
	aed = 'AED',
	rub = 'RUB',
	cad = 'CAD',
}

export enum ECurrencyFlag {
	usd = 'US',
	gbp = 'GB',
	eur = 'EU',
	aed = 'AE',
	rub = 'RU',
	cad = 'CA',
}

export enum ECurrencyName {
	usd = 'US Dollar',
	gbp = 'British Pound',
	eur = 'Euro',
	aed = 'UAE Dirham',
	rub = 'Russian Rouble',
	cad = 'Canadian Dollar',
}

export enum ECurrencyColor {
	usd = '#1c988a',
	gbp = '#d1c5db',
	eur = '#c1cace',
	aed = '#cbc1c2',
	rub = '#c5ccda',
	cad = '#b5cb8f',
}

export enum ECurrencySymbol {
	usd = '$',
	gbp = '£',
	eur = '€',
	aed = 'د.إ',
	rub = '₽',
	cad = 'C$',
}

const usdCurrency = {
	symbol: ECurrencySymbol.usd,
	name: ECurrencyName.usd,
	code: ECurrencyCode.usd,
	flag: ECurrencyFlag.usd,
	color: ECurrencyColor.usd,
};

const eurCurrency = {
	symbol: ECurrencySymbol.eur,
	name: ECurrencyName.eur,
	code: ECurrencyCode.eur,
	flag: ECurrencyFlag.eur,
	color: ECurrencyColor.eur,
};

const aedCurrency = {
	symbol: ECurrencySymbol.aed,
	name: ECurrencyName.aed,
	code: ECurrencyCode.aed,
	flag: ECurrencyFlag.aed,
	color: ECurrencyColor.aed,
};

const gbpCurrency = {
	symbol: ECurrencySymbol.gbp,
	name: ECurrencyName.gbp,
	code: ECurrencyCode.gbp,
	flag: ECurrencyFlag.gbp,
	color: ECurrencyColor.gbp,
};

const rubCurrency = {
	symbol: ECurrencySymbol.rub,
	name: ECurrencyName.rub,
	code: ECurrencyCode.rub,
	flag: ECurrencyFlag.rub,
	color: ECurrencyColor.rub,
};

const cadCurrency = {
	symbol: ECurrencySymbol.cad,
	name: ECurrencyName.cad,
	code: ECurrencyCode.cad,
	flag: ECurrencyFlag.cad,
	color: ECurrencyColor.cad,
};

export const Currencies: {
	[k: string]: {
		symbol: ECurrencySymbol;
		name: ECurrencyName;
		code: ECurrencyCode;
		flag: ECurrencyFlag;
		color: ECurrencyColor;
	};
} = {
	usd: usdCurrency,
	eur: eurCurrency,
	aed: aedCurrency,
	gbp: gbpCurrency,
	rub: rubCurrency,
	cad: cadCurrency,
};

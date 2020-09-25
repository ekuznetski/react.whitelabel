import {
	AccountTypesForTradingStylesSection,
	MobileTradingWithMT5Section,
	OpenLiveAccountBannerSection,
	OurOfferBannerSection,
	PrestigiousPlatformTechnologySection,
} from '@components/sections';
import { ITable, ITabs, Svg, Table, Tabs, Button, SectionBg } from '@components/shared';
import React from 'react';
import { Link } from 'react-router-dom';
import './Platform.scss';

export function Platform() {
	const _tempTableData: ITable = {
		headers: ['Instrument', 'Sell', 'Buy', 'Change %'],
		rows: [
			['Microsoft', '206.24', '206.46', '2.15'],
			['Microsoft', '206.24', '206.46', '2.15'],
			['Microsoft', '206.24', '206.46', '2.15'],
			['Microsoft', '206.24', '206.46', '2.15'],
		],
	};

	const _tempTabsData: ITabs = {
		labels: [
			{ value: 'Forex', anchor: 'forex' },
			{ value: 'Indices', anchor: 'indices' },
			{ value: 'Stocks', anchor: 'stocks' },
			{ value: 'Commodities', anchor: 'commodities' },
			{ value: 'Cryptocurrencies', anchor: 'cryptocurrencies' },
		],
		content: [
			{ value: <Table {..._tempTableData} />, anchor: 'forex' },
			{ value: <Table {..._tempTableData} />, anchor: 'indices' },
			{ value: <Table {..._tempTableData} />, anchor: 'stocks' },
			{ value: <Table {..._tempTableData} />, anchor: 'commodities' },
			{ value: <Table {..._tempTableData} />, anchor: 'cryptocurrencies' },
		],
	};

	return (
		<div className="platform-wrapper">
			<section className="page-top">
				<SectionBg img="platform-page-top.jpg" />
				<div className="container pt-15">
					<div className="row">
						<div className="col-lg-7">
							<div className="page-top__title mb-7">
								<div>World-Leading</div>
								<div>MetaTrader Platform</div>
								<div>
									<strong>Powered by AroFX</strong>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-9 col-xl-8 download-buttons">
							<Button className="mr-6 px-7">Download Desktop Version</Button>
							<Button className="mr-6 px-7 store-link">
								<Svg href="app_store_logo.svg" />
							</Button>
							<Button className="px-7 store-link">
								<Svg href="google_play_logo.svg" />
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="assets">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-lg-9">
							<div className="assets__title mb-7">
								<b>6</b> Asset Classes, <b>150+</b> Instruments
							</div>
							<div className="assets__description mb-md-13">
								CFDs for <Link to={{ pathname: '/products', state: { scrollTo: 'currencies' } }}>Currencies</Link>,{' '}
								<Link to={{ pathname: '/products', state: { scrollTo: 'stocks' } }}>Stocks</Link>,{' '}
								<Link to={{ pathname: '/products', state: { scrollTo: 'indices' } }}>Indices</Link>,{' '}
								<Link to={{ pathname: '/products', state: { scrollTo: 'commodities' } }}>Commodities</Link> and{' '}
								<Link to={{ pathname: '/products', state: { scrollTo: 'crypto' } }}>Cryptocurrencies</Link> at your
								service on one trading account. Monitor and trade the world’s largest financial markets!
							</div>
						</div>
						<div className="col-12 col-lg-9">
							<Tabs {..._tempTabsData} />
						</div>
					</div>
				</div>
			</section>
			<OurOfferBannerSection />
			<PrestigiousPlatformTechnologySection />
			<section className="perfect">
				<SectionBg img="perfect-for-eas.png" />
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="perfect__title mb-4">Perfect For EAs</div>
							<div className="perfect__description mb-13">Automate your trading strategies using Expert Advisors.</div>
						</div>
						<div className="col-12 col-lg-8 offset-lg-2 perfect__items">
							<div className="perfect__item pb-9 py-md-0">
								<Svg href="pc_install.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
								Easy to install
							</div>
							<div className="perfect__item py-9 py-md-0">
								<Svg href="bridge.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
								No third party bridges
							</div>
							<div className="perfect__item pt-9 py-md-0">
								<Svg href="time_reverse_closk.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
								24/5 Trading
							</div>
						</div>
					</div>
				</div>
			</section>
			<AccountTypesForTradingStylesSection />
			<OpenLiveAccountBannerSection />
			<MobileTradingWithMT5Section />
		</div>
	);
}

export default Platform;

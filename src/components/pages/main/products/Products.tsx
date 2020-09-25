import { OpenLiveAccountBannerSection } from '@components/sections';
import { Button, SectionBg } from '@components/shared';
import { MarketType } from '@domain/enums';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Products.scss';
import { ITableSection, TableSection } from './tableSection/TableSection';

export function Products() {
	const [activeSection, selectedSection] = useState('forex');
	const sectionRefs: { [key: string]: RefObject<any> } = Object.keys(MarketType).reduce(
		(acc, key) => Object.assign(acc, { [key]: useRef<HTMLDivElement>(null) }),
		{},
	);
	let { location, replace }: any = useHistory();

	const headerNavigation: { label: string; anchor: MarketType }[] = [
		{ label: 'Forex', anchor: MarketType.forex },
		{ label: 'Stocks', anchor: MarketType.stocks },
		{ label: 'Indices', anchor: MarketType.indices },
		{ label: 'Cryptocurrencies', anchor: MarketType.crypto },
		{ label: 'Commodities', anchor: MarketType.commodities },
		{ label: 'ETFs', anchor: MarketType.etfs },
	];

	const tableSections: ITableSection[] = [
		{
			title: 'Forex',
			desc: 'Trade one of the world’s most liquid asset classes. Choose from our wide range of currency pairs.',
			tableType: MarketType.forex,
			points: [
				<>
					Spreads from <b>0.2 pips</b>
				</>,
				<>
					Max. Leverage <b>1:200</b>
				</>,
				<>
					Margins from just <b>0.50%</b>
				</>,
			],
		},
		{
			title: 'Stocks',
			desc: 'Trade the market movements of the world’s leading brands.',
			tableType: MarketType.stocks,
			reversed: true,
			points: [
				<>
					Max. Leverage <b>1:20</b>
				</>,
				<>
					Margins from just <b>5%</b>
				</>,
			],
		},
		{
			title: 'Indices',
			desc: 'Gain instant access to the global equity markets. Trade market movement in indices.',
			tableType: MarketType.indices,
			points: [
				<>
					<b>15+</b> Most Popular Indices Worldwide
				</>,
				<>
					Max. Leverage <b>1:200</b>
				</>,
			],
		},
		{
			title: 'Cryptocurrencies',
			desc: 'Capitalise on the performance of Bitcoin, Ethereum and Litecoin without the need to buy them.',
			tableType: MarketType.crypto,
			reversed: true,
			points: [
				<>
					Max. Leverage <b>1:20</b>
				</>,
				<>
					<b>5</b> Main Cryptocurrencies
				</>,
			],
		},
		{
			title: 'Commodities',
			desc: 'Trade commodities without owning the financial instrument on which the contract is based.',
			tableType: MarketType.commodities,
			points: [
				<>
					Max. Leverage <b>1:133</b>
				</>,
			],
		},
		{
			title: 'ETFs',
			desc: 'Trade exchange-traded funds with AroFX.',
			tableType: MarketType.etfs,
			reversed: true,
			points: [
				<>
					Max. Leverage <b>1:20</b>
				</>,
			],
		},
	];

	useEffect(() => {
		if (location.state?.scrollTo) {
			setTimeout(() => {
				navigateToSection(location.state?.scrollTo)();
				const state = { ...location.state };
				delete state.scrollTo;
				replace(location.pathname, state);
			}, 10);
		}
	}, [location]);

	function navigateToSection(type: MarketType) {
		return (e?: any) => {
			selectedSection(type);
			sectionRefs[type].current.scrollIntoView({ behavior: 'smooth' });
		};
	}

	return (
		<div className="product-wrapper">
			<section className="page-top">
				<SectionBg img="product-page-top.jpg" />
				<div className="container pt-17">
					<div className="row mb-10">
						<div className="col-lg-7">
							<div className="page-top__title mb-5 mb-lg-7">Range of Markets</div>
						</div>
					</div>
					<div className="row mx-n1">
						{headerNavigation.map((navBtn, n) => (
							<div key={n} className="col-6 col-md-4 col-lg-2 px-1 mb-5 mb-lg-0">
								<Button
									className={navBtn.anchor === activeSection ? 'active' : ''}
									onClick={navigateToSection(navBtn.anchor)}
								>
									{navBtn.label}
								</Button>
							</div>
						))}
					</div>
				</div>
			</section>
			{tableSections.map((sectionProps, s) => (
				<TableSection key={s} {...sectionProps} ref={sectionRefs[sectionProps.tableType]} />
			))}
			<OpenLiveAccountBannerSection />
		</div>
	);
}

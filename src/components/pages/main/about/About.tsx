import { OpenLiveAccountBannerSection } from '@components/sections';
import {
	Button,
	Card,
	CardContent,
	Cards,
	Img,
	ISingleCard,
	ITable,
	ITabs,
	SectionBg,
	Svg,
	Table,
	Tabs,
} from '@components/shared';
import { useResponsive } from 'ahooks';
import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
import { MobileDepositTable } from './mobileDepositTable/MobileDepositTable';

export function About() {
	const responsive = useResponsive();

	const _tempTableData: ITable = {
		headers: ['Method', 'Minimum', 'Currency', 'Processing', 'Fees'],
		rows: [
			[<Img src="bank_wire.png" height={40} />, '$250', 'USD, EUR, GBP, AED', '1 to 7 working days', '$0'],
			[<Img src="visa_mastercard.png" height={40} />, '$20', 'USD, EUR, GBP, RUB, AED, CAD', 'Up to 1 hour', '$0'],
			[<Img src="webmoney.png" height={40} />, '$20', 'USD, EUR', 'Up to 1 hour', '$0'],
			[<Img src="neteller.png" height={40} />, '$20', 'USD, EUR', 'Up to 1 hour', '$0'],
			[<Img src="skrill.png" height={40} />, '$20', 'USD, EUR', 'Up to 1 hour', '$0'],
		],
		colsPctSize: [20, 10, 30, null, 10],
	};

	const _tempTabsData: ITabs = {
		labels: [
			{ value: 'Deposit', anchor: 'deposit' },
			{ value: 'Withdrawals', anchor: 'withdrawals' },
		],
		content: [
			{
				value: responsive.md ? <Table {..._tempTableData} /> : <MobileDepositTable {..._tempTableData} />,
				anchor: 'deposit',
			},
			{
				value: responsive.md ? <Table {..._tempTableData} /> : <MobileDepositTable {..._tempTableData} />,
				anchor: 'withdrawals',
			},
		],
	};

	const trustedCards: ISingleCard[] = [
		{
			header: (
				<>
					130<small>+</small>
				</>
			),
			content: 'Trading Instruments',
			uid: 1,
		},
		{ header: 6, content: 'Asset Classes', uid: 2 },
		{ header: 0, content: 'Deposit Fees', uid: 3 },
		{
			header: (
				<>
					12<small>ms</small>
				</>
			),
			content: 'Avg. Execution',
			uid: 4,
		},
	];

	return (
		<div className="about-wrapper">
			<section className="page-top">
				<SectionBg img="about-page-top.jpg" />
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-lg-7">
							<div className="page-top__title mb-7">Who Are We?</div>
							<div className="page-top__description mb-9">
								As a brand, AroFX combines the most modern trading tech and reliability within a culture of innovation.
								We provide access to a high-tech mobile app and desktop trading platform where you can trade a wide
								variety of assets; forex, stocks, indices, commodities, and more.
							</div>
							<Button>
								<Link to="/registration">Open An Account</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="trusted">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<div className="trusted__title mb-9">Trusted Around The World</div>
							<div className="trusted__description mb-13">
								Entrepreneurs at heart, we have grown from a small fin-tech startup intoa global company with 6
								international offices and clients from 110 countries. AroFX offers flexible trading conditions suitable
								for all types of trading strategies and styles.
							</div>
						</div>
						<div className="col-12 p-0">
							<Cards
								id="trustedCards"
								className="trusted__cards"
								cards={trustedCards}
								cardWrapperClass="col-12 col-md-6 col-lg-3 mb-9 mb-lg-0"
							/>
						</div>
					</div>
				</div>
			</section>
			<OpenLiveAccountBannerSection />
			<section className="deposit">
				<div className="container">
					<div className="row">
						<div className="col p-0">
							<div className="deposit__title mb-12">
								Deposit & Withdrawal
								<b>Information</b>
							</div>
							<Cards id="depositCards" className="deposit__cards mb-16">
								<Card wrapperClassName="col-12 col-md-4 mb-9 mb-md-0" header={<Svg href="zero_pct.svg" />} uid={1}>
									<CardContent>
										No Deposit Fees <small>Fees</small>
									</CardContent>
								</Card>
								<Card wrapperClassName="col-12 col-md-4 mb-9 mb-md-0" header={<Svg href="funds_secure.svg" />} uid={2}>
									<CardContent>
										Funds Secured <small>In Tier-1 Banks</small>
									</CardContent>
								</Card>
								<Card wrapperClassName="col-12 col-md-4 mb-9 mb-md-0" header={<Svg href="timer.svg" />} uid={3}>
									<CardContent>
										Quick <small>Processing</small>
									</CardContent>
								</Card>
							</Cards>
						</div>
						<div className="col-12 px-0 px-md-5">
							<Tabs className="deposit__tabs" {..._tempTabsData} />
						</div>
					</div>
				</div>
			</section>
			<section className="in_touch">
				<SectionBg img="in-touch-bg.png" />
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="in_touch__title mb-7">Always In Touch</div>
							<div className="in_touch__description mb-13">
								Our clients are guaranteed technical support 24 hours a day, 5 days a week. We believe in a ‘single
								window’ system, meaning you can get in touch with a relevant specialist via our LiveChat window, no
								matter what department you need.
							</div>
						</div>
						<div className="col-lg-12">
							<Cards id="inTouchCards" className="in_touch__cards">
								<Card
									wrapperClassName="col-12 col-md-4 mb-9 mb-md-0"
									className="p-10"
									header={6}
									content={'Offices in the world’s leading financial centres'}
									uid={1}
								></Card>
								<Card
									wrapperClassName="col-12 col-md-4 mb-9 mb-md-0"
									className="p-10"
									header={140}
									content={'Service provision in over 140 countries'}
									uid={2}
								></Card>
								<Card
									wrapperClassName="col-12 col-md-4 mb-9 mb-md-0"
									className="p-10"
									header={10}
									content={'Customer support in 10 languages'}
									uid={3}
								></Card>
							</Cards>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default About;

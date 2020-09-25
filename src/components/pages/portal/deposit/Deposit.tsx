import React, { memo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Deposit.scss';
import { PageTitle, Tabs } from '@components/shared';
import { TabContentChooseAmount, TabLabelDepositMethod } from './components';
import { ECurrency, ECurrencyCode } from '@domain/enums';
import { CardMethod } from './components/cardMethod/CardMethod';

export enum EDepositMethods {
	creditCard,
	netteller,
	skrill,
}
export const Deposit = memo(function Deposit() {
	const [depositMethod, setDepositMethod] = useState<EDepositMethods>(EDepositMethods.creditCard);
	const [depositAmount, setDepositAmount] = useState<number | null>(null);

	const tabsContent = {
		labels: [
			{
				value: <TabLabelDepositMethod title="Visa/MasterCard" subTitle="Instant" icon="visa-with-bg" />,
				anchor: 'visa',
			},
			{
				value: <TabLabelDepositMethod title="WebMoney" subTitle="Instant" icon="webmoney-with-bg" />,
				anchor: 'webmoney',
			},
		],
		content: [
			{ value: <TabContentChooseAmount submitFn={submitFn} />, anchor: 'visa' },
			{ value: <TabContentChooseAmount submitFn={submitFn} />, anchor: 'webmoney' },
		],
	};

	function submitFn(data: any) {
		setDepositAmount(data.amount);
	}

	const SelectedDepositMethod = () => {
		switch (depositMethod) {
			case EDepositMethods.creditCard:
				return <CardMethod />;
			case EDepositMethods.netteller:
				return <>netteller</>;
			case EDepositMethods.skrill:
				return <>skrill</>;
		}
	};

	return (
		<Container className="deposit-page-wrapper">
			<Row>
				<Col xs={12}>
					<PageTitle title="Deposit" />
					<Tabs labels={tabsContent.labels} content={tabsContent.content} isVertical={true} />
					{depositAmount && <SelectedDepositMethod />}
				</Col>
			</Row>
		</Container>
	);
});

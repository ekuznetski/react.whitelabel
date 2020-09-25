import { Button, DatePicker, ITabs, PageTitle, Select } from '@components/shared';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import './TransactionStatement.scss';

enum EFields {
	'date' = 'date',
	'operation_type' = 'operation_type',
}

export const TransactionStatement = memo(function TransactionStatement() {
	const validationSchema = Yup.object().shape({
		date: Yup.array(),
	});
	const operationTypes = [
		{ label: 'Deposits', value: 'deposits' },
		{ label: 'Withdrawals', value: 'withdrawal' },
		{ label: 'Trades', value: 'trades' },
	];
	const filters: ITabs = {
		labels: [
			{ value: 'Recent', anchor: 'recent' },
			{ value: 'Monthly', anchor: 'monthly' },
			{ value: 'Custom Range', anchor: 'range' },
		],
		content: [
			{
				value: <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />,
				anchor: 'recent',
			},
			{
				value: <Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />,
				anchor: 'monthly',
			},
			{
				value: <DatePicker label="Choose date range" name={EFields.date} range={true} />,
				anchor: 'range',
			},
		],
	};

	function Submit(values: any, formikHelpers: FormikHelpers<any>) {
		//date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
		//date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss'),
		alert('Call `clients/bankingStatements` API.');
	}

	return (
		<Container className="transaction-statement-page-wrapper">
			<Row>
				<Col xs={12}>
					<PageTitle title="Transactional Statement" />
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-10 px-9">
					<Formik initialValues={{}} validationSchema={validationSchema} onSubmit={Submit}>
						{({ values }: FormikProps<any>) => {
							return (
								<Form className="transaction-statement__form">
									<Select placeholder="Account Type" options={operationTypes} name={EFields.operation_type} />
									<Button type="submit">Get Trading Statement</Button>
								</Form>
							);
						}}
					</Formik>
				</Col>
			</Row>
		</Container>
	);
});

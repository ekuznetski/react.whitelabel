import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';

enum EFields {
	'beneficiary_name' = 'beneficiary_name',
	'beneficiary_bank' = 'beneficiary_bank',
	'beneficiary_bank_account_no' = 'beneficiary_bank_account_no',
	'swift_code' = 'swift_code',
	'iban' = 'iban',
	'branch_name' = 'branch_name',
	'branch_address' = 'branch_address',
}

export const BankDetails = memo(
	forwardRef<HTMLDivElement>(function BankDetails(props, ref) {
		const validationSchema = Yup.object().shape({
			beneficiary_name: FieldValidators.requiredString.max(100, 'Name must not exceed ${max} characters'),
			beneficiary_bank: FieldValidators.requiredString.max(100, 'Bank Name must not exceed ${max} characters'),
			beneficiary_bank_account_no: FieldValidators.requiredString.max(
				100,
				'Bank Account Number must not exceed ${max} symbols',
			),
			swift_code: FieldValidators.swift,
			iban: Yup.string().max(50, 'IBAN must not exceed ${max} characters'),
			branch_name: FieldValidators.requiredString.max(100, 'Bank Branch Name must not exceed ${max} characters'),
			branch_address: FieldValidators.requiredString.max(100, 'Bank Branch Address must not exceed ${max} characters'),
		});

		return (
			<div className="dank-details">
				<Container className="internal-transfer-page-wrapper">
					<Row className="justify-content-center">
						<Col xs={12} md={10} lg={8} xl={7} className="form-wrapper py-10 px-9">
							<Formik
								initialValues={{
									beneficiary_name: '',
									beneficiary_bank: '',
									beneficiary_bank_account_no: '',
									swift_code: '',
									iban: '',
									branch_name: '',
									branch_address: '',
								}}
								validationSchema={validationSchema}
								onSubmit={() => alert('Call `bankaccounts/saveaccount` API.')}
							>
								{({ values }: FormikProps<any>) => {
									return (
										<Form className="internal-transfer__form">
											<Row>
												<Col xs={12} md={6}>
													<Input label="Beneficiary's Name" name={EFields.beneficiary_name} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="Beneficiary's Bank Name" name={EFields.beneficiary_bank} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="Beneficiary's Bank Account Number" name={EFields.beneficiary_bank_account_no} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="SWIFT Code" name={EFields.swift_code} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="IBAN (IF Applicable)" name={EFields.iban} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="Beneficiary's Bank Branch Name" name={EFields.branch_name} />
												</Col>
												<Col xs={12} md={6}>
													<Input label="Beneficiary's Branch Full Address" name={EFields.branch_address} />
												</Col>
											</Row>
											<Button type="submit">Save</Button>
										</Form>
									);
								}}
							</Formik>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}),
);

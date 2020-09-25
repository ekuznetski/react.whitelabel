import React from 'react';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CurrencySelect, Input, Radio, Select } from '@components/shared';
import { Col, Row } from 'react-bootstrap';
import { FieldValidators } from '@domain';
import { ERegSteps } from '@components/pages';

enum EFields {
	'uscitizen' = 'uscitizen',
	'pep' = 'pep',
	'password' = 'password',
	'confirmPassword' = 'confirmPassword',
}

export function FourthStep({ submitFn }: any) {
	const validationSchema = Yup.object().shape({
		uscitizen: FieldValidators.requiredString,
		pep: FieldValidators.requiredString,
		password: FieldValidators.password,
		confirmPassword: FieldValidators.password.oneOf([Yup.ref('password'), ''], 'Passwords must match'),
	});

	return (
		<div>
			<Formik
				initialValues={{
					uscitizen: 'no',
					pep: 'no',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(data) => {
					console.log(data);
					delete data.confirmPassword;
					submitFn({ [ERegSteps.step4]: data });
				}}
			>
				{(props: any) => {
					const { values, setFieldValue } = props;
					return (
						<Form className="m-auto form fadein-row">
							<h4 className="section-title mb-5">Are You a US Reportable Person? *</h4>
							<Radio
								className="mb-10"
								name={EFields.uscitizen}
								options={[
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' },
								]}
							/>
							<h4 className="section-title mb-5">Are you a Politically Exposed Person (PEP)? *</h4>
							<Radio
								className="mb-10"
								name={EFields.pep}
								options={[
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' },
								]}
							/>
							<p>
								*Politically Exposed Person (PEP) means a natural person who is or has been entrusted with prominent
								public functions during the last twelve (12) months, as well as immediate family members and close
								associates of such a person
							</p>
							<h4 className="section-title mb-5">Set a Password</h4>
							<Row>
								<Col xs={12} sm={6}>
									<Input label="Password" name={EFields.password} type="password" />
								</Col>
								<Col xs={12} sm={6}>
									<Input label="Confirm password" name={EFields.confirmPassword} type="password" />
								</Col>
							</Row>
							<Button type="submit">Next</Button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

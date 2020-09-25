import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './FooterPortal.scss';

export default function FooterPortal() {
	return (
		<Container className="py-9">
			<Row className="mb-6">
				<Col xs={12} className="d-flex align-items-center">
					<div className="links d-flex flex-column flex-sm-row">
						<a className="links-item">Legal Forms & Documents</a>
						<div className="links-divider" />
						<a className="links-item">Risk Warnings</a>
						<div className="links-divider" />
						<a className="links-item">Cookies Policy</a>
					</div>
				</Col>
			</Row>
			<Row className="mb-2">
				<Col xs={12} className="context">
					<b>High Risk Investment Warning:</b> CFDs are leveraged products and can result in the loss of all invested
					capital. Please consider our Risk Disclosure Notice. HYCM Limited is an International Business Company
					registered in Saint Vincent and the Grenadines with registration number 25228 (IBC 2018). Other subsidiaries
					of Henyep Group are regulated by the CySEC, FCA and DFSA.
				</Col>
			</Row>
			<Row className="copyright">
				<Col xs={12}>*Henyep’s journey started since 1977.</Col>
			</Row>
		</Container>
	);
}

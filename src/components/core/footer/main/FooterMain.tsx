import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './FooterMain.scss';
import { Svg } from '@components/shared';

export default function FooterMain() {
	return (
		<Container className="py-lg-16 py-md-15 py-13">
			<Row className="mb-lg-11 mb-9">
				<Col xs={12} className="live-chat">
					<Svg href="chat.svg" className="mr-5" /> LIVE CHAT
				</Col>
			</Row>
			<Row className="mb-lg-11 mb-9">
				<Col xs={12} className="outer-links-container">
					<div className="links mb-9">
						<a className="links-item">
							Legal Forms & Documents
						</a>
						<div className="links-divider"></div>
						<a className="links-item">
							Risk Warnings
						</a>
						<div className="links-divider"></div>
						<a className="links-item">
							Cookies Policy
						</a>
					</div>
					<div className="social-links ml-auto">
						<Svg href="facebook.svg" className="mr-5" />
						<Svg href="tweeter.svg" className="mr-5" />
						<Svg href="linkedin.svg" className="mr-5" />
						<Svg href="instagram.svg" className="mr-5" />
						<Svg href="youtube.svg" />
					</div>
				</Col>
			</Row>
			<Row className="mb-4">
				<Col xs={12} className="context mb-lg-9 mb-7">
					<b>High Risk Investment Warning:</b> Contracts for Difference (‘CFDs’) are complex financial products that are
					traded on margin. Trading CFDs carries a high degree of risk. It is possible to lose all your capital. These
					products may not be suitable for everyone and you should ensure that you understand the risks involved. Seek
					independent expert advice if necessary and speculate only with funds that you can afford to lose. Please think
					carefully whether such trading suits you, taking into consideration all the relevant circumstances as well as
					your personal resources. We do not recommend clients posting their entire account balance to meet margin
					requirements. Clients can minimise their level of exposure by requesting a change in leverage limit. For more
					information please refer to HYCM’s Risk Disclosure.
				</Col>
				<Col xs={12} className="context mb-lg-9 mb-7">
					<b>Disclaimer:</b> The content of this page is for information purposes only and it is not intended as a
					recommendation or advice. Any indication of past performance or simulated past performance included in
					advertisements published by HYCM is not a reliable indicator of future results. The customer carries the sole
					responsibility for all the businesses or investments that are carried out at HYCM.
				</Col>
				<Col xs={12} className="context mb-lg-9 mb-7">
					<b>Regional Restrictions:</b> We do not offer our services to residents of certain jurisdictions such as
					Afghanistan, Belgium, Hong Kong, Japan, the United States of America and some other regions. For more
					information please refer to our <a>Help Center</a>.
				</Col>
			</Row>
			<hr />
			<Row className="mt-lg-11 mt-9 copyright">
				<Col xs={12}>Copyright © 2019 HYCM</Col>
			</Row>
		</Container>
	);
}

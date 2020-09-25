import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WithdrawalHistorySection.scss';
import { MWithdrawalHistoryItem } from '@domain/models';
import { WithdrawalHistoryItem } from '..';

export const WithdrawalHistorySection = memo(function WithdrawalHistorySection(props: {
	items: MWithdrawalHistoryItem[];
}) {
	return (
		<section className="withdrawal-page__history">
			<Row className="justify-content-center">
				<Col xs={12} md={9} lg={7} xl={6} className="mt-11 p-0">
					<div className="withdrawal-history__title mb-10">Recent Withdrawals</div>
					<div className="withdrawal-history__content">
						{props.items.map((item, idx) => (
							<WithdrawalHistoryItem key={idx} {...item} />
						))}
					</div>
				</Col>
			</Row>
		</section>
	);
});

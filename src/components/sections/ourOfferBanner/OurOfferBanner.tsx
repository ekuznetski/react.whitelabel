import React, { memo, forwardRef } from 'react';
import classNames from 'classnames';
import { Svg } from '@components/shared';
import './OurOfferBanner.scss';
import { Container, Row, Col } from 'react-bootstrap';

export const OurOfferBannerSection = memo(
	forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OurOfferBannerSection(props, ref) {
		return (
			<section className={classNames('our-offer-banner-section', props.className)} ref={ref}>
				<Container>
					<Row>
						<Col xs={12} md={4} className="py-8">
							<Svg href="zero_pct.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
							Zero Deposit Fees
						</Col>
						<Col xs={12} md={4} className="py-8">
							<Svg href="graph.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
							1:200 Max Leverage
						</Col>
						<Col xs={12} md={4} className="py-8">
							<Svg href="gear_24hr.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
							24/5 Customer Support
						</Col>
					</Row>
				</Container>
			</section>
		);
	}),
);

import React, { memo, forwardRef } from 'react';
import { Img, Button } from '@components/shared';
import './PrestigiousPlatformTechnology.scss';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const PrestigiousPlatformTechnologySection = memo(
	forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function PrestigiousPlatformTechnologySection(
		props,
		ref,
	) {
		return (
			<section className={classNames('prestigious-platform-technology', props.className)} ref={ref}>
				<Container>
					<Row>
						<Col xs={12} lg={6} className="mt-md-12 mt-lg-0 mb-12 mt-md-0">
							<div className="prestigious-platform-technology__title mb-7">
								Prestigious MT5 <br />
								<b>Platform Technology</b>
							</div>
							<div className="prestigious-platform-technology__description mb-10">
								<div className="mb-6">
									Metatrader is the most popular electronic trading platforms and has long been considered the{' '}
									<b>forex industry standard</b> because of its innovative technology.
								</div>
								<div className="mb-6">
									The platform is suitable for traders of all levels and expertise, offering flexible trading systems, a
									mobile app, Expert Advisors, and advanced technical analysis.
								</div>
								<div>
									Compared to its predecessor, MT5 has <b>additional features</b> including 6 types of pending orders,
									21 timeframes to choose from, and an integrated fundamental economic calendar.
								</div>
							</div>
							<Button>
								<Link to="/registration">Open Live Account</Link>
							</Button>
						</Col>
						<Col xs={12} lg={6}>
							<Img src="platform_devices.jpg" />
						</Col>
					</Row>
				</Container>
			</section>
		);
	}),
);

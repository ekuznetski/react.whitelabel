import React, { forwardRef, memo } from 'react';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import './SimpleToGetStarted.scss';
import { SectionBg } from '@components/shared';

export const SimpleToGetStartedSection = memo(
	forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SimpleToGetStartedSection(props, ref) {
		return (
			<section className={classNames('simple-to-get-started', props.className)} ref={ref}>
				<SectionBg img="simple-to-get-started.png" />
				<Container>
					<Row>
						<Col xs={12} lg={4} xl={3} className="mb-11 mb-lg-0">
							<div className="simple-to-get-started__title mb-7">
								It's Simple
								<b>to Get Started</b>
							</div>
							<div className="simple-to-get-started__description">Start Trading In 3 Easy Steps.</div>
						</Col>
						<Col xs={12} lg={8} className="offset-xl-1 simple-to-get-started__steps">
							<Row>
								<Col xs={12} md={4} className="mb-7 mb-md-0">
									<div className="step px-7 py-8 p-xl-9">
										<div className="step-title mb-0 mb-md-3 mt-n1">
											<div className="step-title-number mr-5 ml-n3">1</div>
											Sign Up
										</div>
										<div className="step-context">Create a free trading account</div>
									</div>
								</Col>
								<Col xs={12} md={4} className="mb-7 mb-md-0">
									<div className="step p-7 p-xl-9">
										<div className="step-title mb-0 mb-md-3 mt-n1">
											<div className="step-title-number mr-5 ml-n3">2</div>
											Explore The Platform
										</div>
										<div className="step-context">Explore trading opportunities</div>
									</div>
								</Col>
								<Col xs={12} md={4}>
									<div className="step p-7 p-xl-9">
										<div className="step-title mb-0 mb-md-3 mt-n1">
											<div className="step-title-number mr-5 ml-n3">3</div>
											Start Trading
										</div>
										<div className="step-context">Start investing in the world’s most popular markets</div>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}),
);

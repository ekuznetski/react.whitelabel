import React, { memo, forwardRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './OpenLiveAccountBanner.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Button, SectionBg } from '@components/shared';

export const OpenLiveAccountBannerSection = memo(
	forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OpenLiveAccountBannerSection(props, ref) {
		return (
			<section className={classNames('open-live-account-banner', props.className)} ref={ref}>
				<SectionBg img="live-account-bg.png" />
				<Container>
					<Row>
						<Col lg={5} className="mb-12 mb-lg-0">
							<div className="open-live-account-banner__title mb-7">
								Financial Experience
								<b>You Can Rely On</b>
							</div>
							<div className="open-live-account-banner__description">
								Your investment is safe in our hands - AroFX is regulated by the world’s largest financial authorities.
							</div>
						</Col>
						<Col xs={12} lg={3} className="offset-lg-3 open-account mt-12 mt-lg-0">
							<div className="open-live-account-banner__title mb-3">
								<b>Live Account</b>
							</div>
							<div className="open-live-account-banner__description mb-8 mb-md-6">
								Discover our trading tools and access our assets.
							</div>
							<Button>
								<Link to="/registration">Open Live Account</Link>
							</Button>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}),
);

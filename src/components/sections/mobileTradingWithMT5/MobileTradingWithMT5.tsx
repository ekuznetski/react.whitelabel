import React, { memo, forwardRef, HTMLAttributes } from 'react';
import './MobileTradingWithMT5.scss';
import { Img, Svg, Button } from '@components/shared';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

export const MobileTradingWithMT5Section = memo(
	forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function MobileTradingWithMT5Section(props, ref) {
		return (
			<section className={classNames('mobile-trading-with-mt5', props.className)}>
				<Container>
					<Row>
						<Col xs={12} lg={5} className="mb-12 mb-lg-0 mt-12 mb-md-0">
							<Img src="mobile_trading.jpg" />
						</Col>
						<Col xs={12} lg={6} className="offset-lg-1 pt-lg-10 pr-lg-6">
							<div className="mobile-trading-with-mt5__title mb-7">
								<b>Mobile Trading</b>
								<br />
								With MT5
							</div>
							<div className="mobile-trading-with-mt5__description mb-10">
								<div className="mb-6">
									Have complete control over your account with our native mobile app; open, close, and manage trading
									positions from your mobile phone.
								</div>
								<div className="mb-6">
									Download MetaTrader 5 for Android/iOS on your smartphone or tablet and trade Forex anytime and
									anywhere in the world!
								</div>
							</div>
							<div className="store-links">
								<Button className="mr-md-6 px-7 mb-7 mb-md-0">
									<Svg href="app_store_logo.svg" />
								</Button>
								<Button className="mr-md-6 px-7">
									<Svg href="google_play_logo.svg" />
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}),
);

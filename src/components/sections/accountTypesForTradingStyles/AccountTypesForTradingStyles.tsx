import React, { memo, forwardRef } from 'react';
import classNames from 'classnames';
import { Cards, Card, CardHeader, Svg, CardContent } from '@components/shared';
import './AccountTypesForTradingStyles.scss';

export const AccountTypesForTradingStylesSection = memo(
	forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AccountTypesForTradingStylesSection(
		props,
		ref,
	) {
		return (
			<section className={classNames('account-types-for-trading-styles-section', props.className)} ref={ref}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="account-types-for-trading-styles-section__title mb-4">
								Account types for all trading styles
							</div>
							<div className="account-types-for-trading-styles-section__description mb-13">
								How do you like your spreads? We offer both fixed and variable accounts, so the choice is yours!
							</div>
						</div>
						<div className="col-12 p-0">
							<Cards id="accountTypesForTradingStylesSectionCards">
								<Card wrapperClassName="col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={1}>
									<CardHeader className="mb-7">
										<Svg href="empty_star.svg" className="mr-5" />
										Fixed
										<span>
											1.8<small>pips</small>
										</span>
									</CardHeader>
									<CardContent className="text-left">
										<div className="mb-1">Fixed Spreads from</div>
										<span className="greyText">No Commission</span>
									</CardContent>
								</Card>
								<Card wrapperClassName="col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={2}>
									<CardHeader className="mb-7">
										<Svg href="empty_light.svg" className="mr-5" />
										Variable
										<span>
											1.2<small>pips</small>
										</span>
									</CardHeader>
									<CardContent className="text-left">
										<div className="mb-1">Variable Spreads from</div>
										<span className="greyText">No Commission</span>
									</CardContent>
								</Card>
							</Cards>
						</div>
					</div>
				</div>
			</section>
		);
	}),
);

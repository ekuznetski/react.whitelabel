import { Svg } from '@components/shared';
import { ETradingType } from '@domain/enums';
import React, { memo } from 'react';
import './TradingAccountAddCard.scss';
import classNames from 'classnames';

export interface ITradingAccountAddCard {
	type: ETradingType;
	inline?: boolean;
}

export const TradingAccountAddCard = memo(function TradingAccountAddCard(props: ITradingAccountAddCard) {
	return (
		<div className={classNames('trading-account-add-card', props.inline ? 'col-12 inline' : 'col-4')}>
			<div className="trading-account-card-wrapper">
				<div className={classNames("account-card__btn", !props.inline && "mb-2")}>
					<Svg href="plus.svg" />
				</div>
				<div className="account-card__text">Create {props.type} Account</div>
			</div>
		</div>
	);
});

import { Svg } from '@components/shared';
import { ETradingType } from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './TradingAccountAddCard.scss';

export interface ITradingAccountAddCard {
  type: ETradingType;
  inline?: boolean;
}

export const TradingAccountAddCard = memo(function TradingAccountAddCard(props: ITradingAccountAddCard) {
  const { t } = useTranslation();

  return (
    <div className={classNames('trading-account-add-card', props.inline ? 'col-12 inline' : 'col-4')}>
      <div className="trading-account-card-wrapper">
        <div className={classNames('account-card__btn', !props.inline && 'mb-2')}>
          <Svg href="plus.svg" />
        </div>
        <div className="account-card__text">
          {t('Create')} {props.type == ETradingType.demo ? t('Demo') : t('Live')} {t('Account')}
        </div>
      </div>
    </div>
  );
});

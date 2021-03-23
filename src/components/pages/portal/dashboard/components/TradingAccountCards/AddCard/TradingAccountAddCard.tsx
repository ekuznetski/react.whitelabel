import { LocaleLink, Svg } from '@components/shared';
import { ETradingType } from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
export interface ITradingAccountAddCard {
  type: ETradingType[];
  inline?: boolean;
}

export const TradingAccountAddCard = memo(function TradingAccountAddCard(props: ITradingAccountAddCard) {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        'trading-account-add-card',
        props.inline ? 'col-12 inline' : 'col-12 col-lg-4 col-md-6 mb-lg-0 mb-9',
      )}
    >
      <LocaleLink
        className="trading-account-card-wrapper"
        to={`/open-account/${props.type.includes(ETradingType.demo) ? 'demo' : 'live'}`}
      >
        <div className={classNames('account-card__btn', !props.inline && 'mb-2')}>
          <Svg href="plus" />
        </div>
        <div className="account-card__text">
          {t('Create')} {props.type.includes(ETradingType.demo) ? t('Demo') : t('Live')} {t('Account')}
        </div>
      </LocaleLink>
    </div>
  );
});

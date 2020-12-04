import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import './AccountTypesForTradingStyles.scss';
import { AccountTypesCards } from './components';

export const AccountTypesForTradingStylesSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AccountTypesForTradingStylesSection(
    props,
    ref,
  ) {
    const { t } = useTranslation();

    return (
      <section className={classNames('account-types-for-trading-styles-section', props.className)} ref={ref}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="account-types-for-trading-styles-section__title mb-4">
                {t('Account types for all trading styles')}
              </div>
              <div className="account-types-for-trading-styles-section__description mb-13">
                {t('Account Types Secure Desc')}
              </div>
            </div>
            <div className="col-12 p-0">
              <AccountTypesCards />
            </div>
          </div>
        </div>
      </section>
    );
  }),
);

import { Card, CardContent, CardHeader, Cards, LabelView, Svg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import './AccountTypesForTradingStyles.scss';
import { accountTypePip } from '@domain';
import { ELabels } from '@domain/enums';

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
              <Cards id="accountTypesForTradingStylesSectionCards">
                <Card wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0" uid={1}>
                  <CardHeader className="mb-7 header">
                    <div>
                      <Svg href="star" className="mr-5" />
                      {t('Fixed')}
                    </div>
                    <span>
                      {accountTypePip.fixed}
                      <small>{t('pips')}</small>
                    </span>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="mb-1">{t('Fixed Spreads from')}</div>
                    <span className="greyText">{t('No Commission')}</span>
                  </CardContent>
                </Card>
                <Card wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0" uid={2}>
                  <CardHeader className="mb-7 header">
                    <div>
                      <Svg href="light" className="mr-5" />
                      {t('Variable')}
                    </div>
                    <span>
                      {accountTypePip.variable}
                      <small>{t('pips')}</small>
                    </span>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="mb-1">{t('Variable Spreads from')}</div>
                    <span className="greyText">{t('No Commission')}</span>
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

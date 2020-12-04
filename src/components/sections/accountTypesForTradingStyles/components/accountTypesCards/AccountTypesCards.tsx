import React, { forwardRef, memo } from 'react';
import { Card, CardContent, CardHeader, Cards, Svg } from '@components/shared';
import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const AccountTypesCards = memo(() => {
  return (
    <Cards id="accountTypesForTradingStylesSectionCards">
      <Card wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0" key={1} uid={1}>
        <CardHeader className="mb-7 header">
          <div>
            <Svg href="empty_star" className="mr-5" />
            {t('Fixed')}
          </div>
          <span>
            1.8<small>{t('pips')}</small>
          </span>
        </CardHeader>
        <CardContent className="text-left">
          <div className="mb-1">{t('Fixed Spreads from')}</div>
          <span className="greyText">{t('No Commission')}</span>
        </CardContent>
      </Card>
      <Card wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0" key={2} uid={2}>
        <CardHeader className="mb-7 header">
          <div>
            <Svg href="empty_light" className="mr-5" />
            {t('Variable')}
          </div>
          <span>
            1.2<small>{t('pips')}</small>
          </span>
        </CardHeader>
        <CardContent className="text-left">
          <div className="mb-1">{t('Variable Spreads from')}</div>
          <span className="greyText">{t('No Commission')}</span>
        </CardContent>
      </Card>
    </Cards>
  );
});

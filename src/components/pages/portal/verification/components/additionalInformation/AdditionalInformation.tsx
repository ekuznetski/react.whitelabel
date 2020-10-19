import { Tab, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './AdditionalInformation.scss';

export const AdditionalInformation = memo(function AdditionalInformation() {
  const { t } = useTranslation();

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true}>
        <Tab label={t('Complete EDD Form')} subLabel={'success'} anchor="eddForm">
          {t('Complete EDD Form')}
        </Tab>
        <Tab label={t('Tax Identification')} anchor="taxIdentification">
          {t('Tax Identification')}
        </Tab>
        <Tab label={t('Debit/Credit Card Verification')} anchor="cardVerification">
          {t('Debit/Credit Card Verification')}
        </Tab>
      </Tabs>
    </div>
  );
});

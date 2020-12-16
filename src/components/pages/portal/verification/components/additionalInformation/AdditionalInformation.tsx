import { Tab, Tabs } from '@components/shared';
import { EClientStatusCode } from '@domain/enums';
import { MClientStatus } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CreditCardVerification, EddForm, TaxIdentification } from '..';
import './AdditionalInformation.scss';

enum EAddInfoTabs {
  edd = 'edd',
  tins = 'tins',
  card = 'card',
}

export const AdditionalInformation = memo(function AdditionalInformation() {
  const { statusData } = useSelector<IStore, { statusData: MClientStatus }>((state) => ({
    statusData: state.data.client.statusData,
  }));
  const { t } = useTranslation();

  const initialActiveTab =
    (EClientStatusCode.required === statusData.edd_status.code && EAddInfoTabs.edd) ||
    (EClientStatusCode.required === statusData.tins_status.code && EAddInfoTabs.tins) ||
    // EClientStatusCode.required === statusData.card.code && EAddInfoTabs.eddForm ||
    EAddInfoTabs.edd;

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true} activeTab={initialActiveTab}>
        <Tab label={t('Complete EDD Form')} subLabel={'success'} anchor={EAddInfoTabs.edd}>
          <EddForm />
        </Tab>
        <Tab label={t('Tax Identification')} anchor={EAddInfoTabs.tins}>
          <TaxIdentification />
        </Tab>
        <Tab label={t('Debit/Credit Card Verification')} anchor={EAddInfoTabs.card}>
          <CreditCardVerification />
        </Tab>
      </Tabs>
    </div>
  );
});

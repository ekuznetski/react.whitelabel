import { Tab, Tabs } from '@components/shared';
import { EClientStatusCode, EDocumentsType } from '@domain/enums';
import { MClientStatus, MDocuments } from '@domain/models';
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
  const { clientStatus, documents } = useSelector<IStore, { clientStatus: MClientStatus; documents: MDocuments }>(
    (state) => ({
      clientStatus: state.data.client.status,
      documents: state.data.client.documents,
    }),
  );
  const { t } = useTranslation();

  const initialActiveTab =
    (EClientStatusCode.required === clientStatus.edd_status.code && EAddInfoTabs.edd) ||
    (EClientStatusCode.required === clientStatus.tins_status.code && EAddInfoTabs.tins) ||
    // EClientStatusCode.required === clientStatus.card.code && EAddInfoTabs.card ||
    EAddInfoTabs.edd;

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true} activeTab={initialActiveTab}>
        {![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.edd_status.code) && (
          <Tab
            status={clientStatus.edd_status.notificationType}
            label={t('Complete EDD Form')}
            subLabel={clientStatus.edd_status.message}
            anchor={EAddInfoTabs.edd}
          >
            <EddForm />
          </Tab>
        )}
        {![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.tins_status.code) && (
          <Tab
            status={clientStatus.tins_status.notificationType}
            label={t('Tax Identification')}
            subLabel={clientStatus.tins_status.message}
            anchor={EAddInfoTabs.tins}
          >
            <TaxIdentification />
          </Tab>
        )}
        <Tab
          // className={classNames(clientStatus.edd_status.notificationType)}
          label={t('Debit/Credit Card Verification')}
          subLabel={documents.getStatusByDocumentType(EDocumentsType.CCFront)}
          anchor={EAddInfoTabs.card}
        >
          <CreditCardVerification />
        </Tab>
      </Tabs>
    </div>
  );
});

import { Tab, Tabs } from '@components/shared';
import { EAddInfoTabs, EClientStatusCode, EDocumentsType } from '@domain/enums';
import { MClientStatus, MDocuments } from '@domain/models';
import { IStore } from '@store';
import { getCcFilesStatus } from '@utils/fn';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CreditCardVerification, EddForm, TaxIdentification } from '..';
import './AdditionalInformation.scss';

export const AdditionalInformation = memo(function AdditionalInformation() {
  const { clientStatus, documents } = useSelector<IStore, { clientStatus: MClientStatus; documents: MDocuments }>(
    (state) => ({
      clientStatus: state.data.client.status,
      documents: state.data.client.documents,
    }),
  );
  const { t } = useTranslation();
  const ccFilesStatus = getCcFilesStatus(
    [
      EDocumentsType.CCCopy1,
      EDocumentsType.CCCopy2,
      EDocumentsType.CCCopy3,
      EDocumentsType.CCCopy4,
      EDocumentsType.CCCopy5,
    ],
    documents,
  );
  const initialActiveTab = _getFirstUnverifiedTab();

  function _getFirstUnverifiedTab(): EAddInfoTabs {
    if (EClientStatusCode.required === clientStatus.edd_status.code) {
      return EAddInfoTabs.edd;
    }

    if (EClientStatusCode.required === clientStatus.tins_status.code) {
      return EAddInfoTabs.tins;
    }

    if (ccFilesStatus.code !== EClientStatusCode.submitted) {
      return EAddInfoTabs.card;
    }

    return EAddInfoTabs.card;
  }

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true} activeTab={initialActiveTab}>
        {![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.edd_status.code) && (
          <Tab
            status={clientStatus.edd_status.notificationType}
            label={t('Complete EDD Form')}
            subLabel={clientStatus.edd_status.statusMessage}
            anchor={EAddInfoTabs.edd}
          >
            <EddForm />
          </Tab>
        )}
        {![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.tins_status.code) && (
          <Tab
            status={clientStatus.tins_status.notificationType}
            label={t('Tax Identification')}
            subLabel={clientStatus.tins_status.statusMessage}
            anchor={EAddInfoTabs.tins}
          >
            <TaxIdentification />
          </Tab>
        )}
        <Tab
          status={ccFilesStatus.notificationType}
          label={t('Debit/Credit Card Verification')}
          subLabel={ccFilesStatus.statusMessage}
          anchor={EAddInfoTabs.card}
        >
          <CreditCardVerification />
        </Tab>
      </Tabs>
    </div>
  );
});

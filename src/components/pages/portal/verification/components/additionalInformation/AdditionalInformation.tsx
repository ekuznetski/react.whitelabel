import { Tab, Tabs } from '@components/shared';
import { EClientStatus, EClientStatusCode, EDocumentsType, ENotificationType } from '@domain/enums';
import { MClientStatus, MDocuments } from '@domain/models';
import { IStore } from '@store';
import { generateStatus } from '@utils/fn/generateStatus';
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
    EAddInfoTabs.card;
  const ccFilesStatus = documents
    .getAllDocumentsOfTypes([
      EDocumentsType.CCCopy1,
      EDocumentsType.CCCopy2,
      EDocumentsType.CCCopy3,
      EDocumentsType.CCCopy4,
      EDocumentsType.CCCopy5,
    ])
    .map((file) => file.code)
    .reduce((a, c, i, arr) => {
      if (arr.includes(EClientStatusCode.rejected) && arr.splice(1))
        // if arr includes rejected code, enforce arr to be the size of 1, so the .reduce() has only 1 iteration
        return generateStatus(EClientStatus.rejected);
      return generateStatus(EClientStatus.submitted);
    }, generateStatus(EClientStatus.notSubmitted));

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

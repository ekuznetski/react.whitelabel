import {
  EAddInfoTabs,
  EClientStatusCode,
  EDocumentsType,
  EUploadDocumentsTabs,
  EVerificationTabs,
} from '@domain/enums';
import { IGetFirstUnverifiedTab } from '@domain/interfaces';
import { MClientStatus, MDocuments } from '@domain/models';
import { IStore } from '@store';
import { useSelector } from 'react-redux';
import { getCcFilesStatus } from '.';

export function getFirstUnverifiedTab(): IGetFirstUnverifiedTab {
  const { clientStatus, documents } = useSelector<IStore, { clientStatus: MClientStatus; documents: MDocuments }>(
    (state) => ({
      clientStatus: state.data.client.status,
      documents: state.data.client.documents,
    }),
  );

  if (clientStatus.fp_status.code !== EClientStatusCode.submitted) {
    return { mainTab: EVerificationTabs.FinancialProfile };
  }

  if (documents.getDocumentByType(EDocumentsType.ID).code !== EClientStatusCode.submitted) {
    return { mainTab: EVerificationTabs.UploadDocuments, subTab: EUploadDocumentsTabs.Identity };
  }

  if (documents.getDocumentByType(EDocumentsType.PoR).code !== EClientStatusCode.submitted) {
    return { mainTab: EVerificationTabs.UploadDocuments, subTab: EUploadDocumentsTabs.Address };
  }

  if (
    ![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.edd_status.code) &&
    EClientStatusCode.required === clientStatus.edd_status.code
  ) {
    return { mainTab: EVerificationTabs.AdditionalInformation, subTab: EAddInfoTabs.edd };
  }

  if (
    ![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.tins_status.code) &&
    EClientStatusCode.required === clientStatus.tins_status.code
  ) {
    return { mainTab: EVerificationTabs.AdditionalInformation, subTab: EAddInfoTabs.tins };
  }

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
  if (ccFilesStatus.code !== EClientStatusCode.submitted) {
    return { mainTab: EVerificationTabs.AdditionalInformation, subTab: EAddInfoTabs.card };
  }

  return { mainTab: EVerificationTabs.FinancialProfile };
}

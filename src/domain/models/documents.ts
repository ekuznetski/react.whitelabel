import { EClientStatus, EDocumentsType } from '@domain/enums';
import { IClientStatus, TClientStatus } from '@domain/interfaces';
import i18n from '@i18next';

const t = i18n.getLazyT;

export type MDocument = TClientStatus & { type: EDocumentsType };

export class MDocuments {
  list: MDocument[] = [];

  constructor(documentsStatus: IClientStatus['document_status_new']) {
    console.log(documentsStatus);
    this.list = Object.keys(documentsStatus).reduce(
      (acc, key) => (
        acc.push({
          type: key as EDocumentsType,
          code: documentsStatus[key].code,
          message: documentsStatus[key].message,
          notificationType: documentsStatus[key].notificationType,
        }),
        acc
      ),
      [] as MDocument[],
    );
  }

  getStatusByDocumentType = (type: EDocumentsType): EClientStatus => {
    return (
      this.list.find((document) => document.type === type)?.message ||
      (t(`Client Status:${EClientStatus.notSubmitted}`) as EClientStatus)
    );
  };

  getAllDocumentsOfTypes = (type: EDocumentsType | EDocumentsType[]): any => {
    type = [type].flat();
    return this.list.filter((document) => type.includes(document.type));
  };
}

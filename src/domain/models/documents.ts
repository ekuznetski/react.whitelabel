import { EClientStatus, EDocumentsType } from '@domain/enums';
import { IClientStatus, TClientStatus } from '@domain/interfaces';
import i18n from '@i18next';
import { generateStatus } from '@utils/fn/generateStatus';

const t = i18n.getLazyT;

export type MDocument = TClientStatus & { type: EDocumentsType; status: string };

export class MDocuments {
  list: MDocument[] = [];

  constructor(documentsStatus: IClientStatus['document_status_new']) {
    const document_status_new: { [k in EDocumentsType]?: TClientStatus } = documentsStatus
      ? Object.keys(documentsStatus).reduce(
          (acc, key) => Object.assign(acc, { [key]: generateStatus(documentsStatus[key].message) }),
          {},
        )
      : {};

    this.list = Object.keys(document_status_new).reduce((acc, key) => {
      const _doc = document_status_new[key as EDocumentsType];
      if (_doc)
        acc.push({
          type: key as EDocumentsType,
          code: _doc.code,
          status: _doc.status,
          statusMessage: _doc.statusMessage,
          notificationType: _doc.notificationType,
        });
      return acc;
    }, [] as MDocument[]);
  }

  getDocumentByType = (type: EDocumentsType): MDocument => {
    return (
      this.list.find((document) => document.type === type) || {
        type: EDocumentsType.NoNType,
        ...generateStatus('notSubmitted'),
      }
    );
  };

  getAllDocumentsOfTypes = (type: EDocumentsType | EDocumentsType[]): any => {
    type = [type].flat();
    return this.list.filter((document) => type.includes(document.type));
  };
}

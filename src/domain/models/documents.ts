import { EDocumentsType, EDocumentsStatus } from '@domain/enums';
import { IDocument } from '@domain/interfaces';
import moment from 'moment';
import { Moment } from 'moment';

export class MDocuments {
  documents: {
    id: string;
    document_status: EDocumentsStatus;
    document_type: EDocumentsType;
    created: Moment;
  }[] = [];

  constructor(props: IDocument[]) {
    this.documents = props.map((document) => ({
      id: document.id,
      document_status:
        EDocumentsStatus[document.document_status as keyof typeof EDocumentsStatus] || EDocumentsStatus.Pending,
      document_type: EDocumentsType[document.document_type as keyof typeof EDocumentsType] || EDocumentsType.NoNType,
      created: moment(document.created),
    }));
  }

  getStatusByType = (type: EDocumentsType): any => {
    return this.documents.find((document) => document.document_type === type) || EDocumentsStatus.NotSubmitted;
  };
}
